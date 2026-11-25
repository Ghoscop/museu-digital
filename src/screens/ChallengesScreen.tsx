import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import { trackEvent } from "../services/interactionTracker";
import {
  getRandomQuestions,
  type Question,
} from "../data/questionBank";

function createAttemptId() {
  return `challenge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ChallengesScreen() {
  const attemptId = useRef(createAttemptId());

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const [questions, setQuestions] = useState<Question[]>(
  () => getRandomQuestions(10)
);

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const percentage = Math.round((score / questions.length) * 100);

  function confirmAnswer() {
    if (selected === null || answered) return;

    const isCorrect = selected === question.answer;

    if (isCorrect) {
      setScore((previous) => previous + 1);
    }

    // Registra a resposta escolhida, sem interromper o desafio
    // caso o armazenamento local apresente algum problema.
    trackEvent("challenge_answer", "Challenges", {
      attemptId: attemptId.current,
      questionIndex: current + 1,
      totalQuestions: questions.length,
      category: question.category,
      question: question.question,
      selectedOptionIndex: selected,
      selectedOption: question.options[selected],
      isCorrect,
      pointsEarned: isCorrect ? 1 : 0,
    }).catch((error) => {
      console.error("Erro ao registrar resposta do desafio:", error);
    });

    setAnswered(true);
  }

  function nextQuestion() {
    if (!answered) return;

    if (current === questions.length - 1) {
      const finalScore = score;
      const finalPercentage = Math.round(
        (finalScore / questions.length) * 100,
      );

      trackEvent("challenge_complete", "Challenges", {
        attemptId: attemptId.current,
        totalQuestions: questions.length,
        score: finalScore,
        percentage: finalPercentage,
      }).catch((error) => {
        console.error("Erro ao registrar conclusão do desafio:", error);
      });

      setFinished(true);
      return;
    }

    setCurrent((previous) => previous + 1);
    setSelected(null);
    setAnswered(false);
  }

  function restart() {
    attemptId.current = createAttemptId();

    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setQuestions(getRandomQuestions(10));
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.tag}>MUSEU DIGITAL  /  EXPERIÊNCIA INTERATIVA</Text>

      <Text style={styles.title}>Desafios do conhecimento</Text>

      <Text style={styles.subtitle}>
        Coloque seus conhecimentos à prova e descubra o quanto você aprendeu
        sobre a Era Digital e a Inteligência Artificial.
      </Text>

      {finished ? (
        <View style={styles.result}>
          <View style={styles.resultIcon}>
            <Ionicons
              name="trophy-outline"
              size={38}
              color={COLORS.accent}
            />
          </View>

          <Text style={styles.resultTag}>MISSÃO CONCLUÍDA</Text>

          <Text style={styles.resultTitle}>
            Sua jornada pelo conhecimento terminou!
          </Text>

          <Text style={styles.score}>
            {score}/{questions.length}
          </Text>

          <Text style={styles.percentage}>
            {percentage}% DE APROVEITAMENTO
          </Text>

          <Text style={styles.resultDescription}>
            Você acertou {score} de {questions.length} perguntas.
            {percentage === 100
              ? " Excelente! Você demonstrou domínio dos temas."
              : percentage >= 70
              ? " Muito bem! Você tem um ótimo conhecimento sobre a era digital."
              : percentage >= 40
              ? " Bom começo! Explore novamente as exposições para aprender ainda mais."
              : " Continue explorando o museu e tente novamente. Cada descoberta conta!"}
          </Text>

          <View style={styles.resultDivider} />

          <TouchableOpacity
            style={styles.button}
            onPress={restart}
            activeOpacity={0.85}
          >
            <Ionicons name="refresh-outline" size={19} color="#FFFFFF" />
            <Text style={styles.buttonText}>Refazer desafio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoLabel}>SUA JORNADA</Text>
              <Text style={styles.infoValue}>
                Pergunta {current + 1} de {questions.length}
              </Text>
            </View>

            <View style={styles.scoreBadge}>
              <Ionicons
                name="star-outline"
                size={16}
                color={COLORS.accent}
              />
              <Text style={styles.scoreBadgeText}>{score} pontos</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>

          <View style={styles.questionBox}>
            <View style={styles.questionHeader}>
              <Text style={styles.category}>{question.category}</Text>
              <Ionicons
                name="sparkles-outline"
                size={20}
                color={COLORS.accent}
              />
            </View>

            <Text style={styles.question}>{question.question}</Text>

            <Text style={styles.instruction}>
              {answered
                ? "RESPOSTA REGISTRADA"
                : "SELECIONE UMA ALTERNATIVA"}
            </Text>

            {question.options.map((option, index) => {
              const isSelected = selected === index;
              const isCorrect = index === question.answer;

              const optionStyle = [
                styles.option,
                answered && isCorrect && styles.correctOption,
                answered && isSelected && !isCorrect && styles.wrongOption,
                !answered && isSelected && styles.selectedOption,
              ];
              const textStyle = [
                styles.optionText,
                answered && isCorrect && styles.correctText,
                answered && isSelected && !isCorrect && styles.wrongText,
                !answered && isSelected && styles.selectedText,
              ];

              return (
                <TouchableOpacity
                  key={index}
                  style={optionStyle}
                  onPress={() => {
                    if (!answered) setSelected(index);
                  }}
                  disabled={answered}
                  activeOpacity={0.8}
                  accessibilityRole="radio"
                  accessibilityState={{
                    selected: isSelected,
                    disabled: answered,
                  }}
                >
                  <View style={styles.optionLetter}>
                    <Text style={styles.optionLetterText}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>

                  <Text style={textStyle}>
                    {option}
                  </Text>

                  {answered && isCorrect && (
                    <Ionicons
                      name="checkmark-circle"
                      size={21}
                      color="#66D6A2"
                    />
                  )}

                  {answered && isSelected && !isCorrect && (
                    <Ionicons
                      name="close-circle"
                      size={21}
                      color="#FF8585"
                    />
                  )}
                </TouchableOpacity>
              );
            })}

            {answered && (
              <View
                style={[
                  styles.feedback,
                  selected === question.answer
                    ? styles.feedbackCorrect
                    : styles.feedbackWrong,
                ]}
              >
                <View style={styles.feedbackTitleRow}>
                  <Ionicons
                    name={
                      selected === question.answer
                        ? "checkmark-circle"
                        : "information-circle"
                    }
                    size={22}
                    color={
                      selected === question.answer ? "#66D6A2" : "#F0BE73"
                    }
                  />

                  <Text style={styles.feedbackTitle}>
                    {selected === question.answer
                      ? "Resposta correta!"
                      : "Não foi dessa vez!"}
                  </Text>
                </View>

                <Text style={styles.feedbackText}>
                  {question.explanation}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              selected === null && !answered && styles.disabledButton,
            ]}
            disabled={selected === null && !answered}
            onPress={answered ? nextQuestion : confirmAnswer}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>
              {answered
                ? current === questions.length - 1
                  ? "Ver resultado"
                  : "Próxima pergunta"
                : "Confirmar resposta"}
            </Text>

            <Ionicons
              name={answered ? "arrow-forward" : "checkmark"}
              size={19}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </>
      )}

      <View style={styles.footer}>
        <Ionicons
          name="school-outline"
          size={17}
          color={COLORS.accent}
        />
        <Text style={styles.footerText}>
          MUSEU DIGITAL — CONHECIMENTO EM CONSTANTE EVOLUÇÃO
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 22,
    paddingBottom: 45,
    width: "100%",
    maxWidth: 750,
    alignSelf: "center",
  },

  tag: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.7,
    marginBottom: 16,
  },

  title: {
    color: COLORS.text,
    fontSize: 29,
    fontWeight: "900",
    lineHeight: 36,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 12,
  },

  infoRow: {
    marginTop: 32,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  infoValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 5,
  },

  scoreBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 9,
    paddingHorizontal: 13,
  },

  scoreBadgeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
  },

  progressTrack: {
    height: 6,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 10,
  },

  questionBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  category: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  question: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 29,
    marginBottom: 22,
  },

  instruction: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 13,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 13,
    padding: 14,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },

  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: "#203E66",
  },

  correctOption: {
    borderColor: "#3C9874",
    backgroundColor: "#173A32",
  },

  wrongOption: {
    borderColor: "#B65C5C",
    backgroundColor: "#402626",
  },

  optionLetter: {
    width: 29,
    height: 29,
    borderRadius: 9,
    backgroundColor: "#263044",
    alignItems: "center",
    justifyContent: "center",
  },

  optionLetterText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "900",
  },

  optionText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },

  selectedText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  correctText: {
    color: "#B5F0D2",
    fontWeight: "700",
  },

  wrongText: {
    color: "#FFC1C1",
    fontWeight: "700",
  },

  feedback: {
    marginTop: 8,
    padding: 15,
    borderRadius: 13,
    borderWidth: 1,
  },

  feedbackCorrect: {
    backgroundColor: "#173A32",
    borderColor: "#3C9874",
  },

  feedbackWrong: {
    backgroundColor: "#3A3022",
    borderColor: "#9C7846",
  },

  feedbackTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 9,
  },

  feedbackTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
  },

  feedbackText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 21,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 17,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  disabledButton: {
    opacity: 0.4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  result: {
    backgroundColor: COLORS.surface,
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  resultIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  resultTag: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  resultTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 29,
    marginTop: 13,
  },

  score: {
    color: COLORS.accent,
    fontSize: 54,
    fontWeight: "900",
    marginTop: 20,
  },

  percentage: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginTop: 4,
  },

  resultDescription: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 17,
  },

  resultDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    width: "100%",
    marginTop: 25,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 35,
  },

  footerText: {
    color: COLORS.textSecondary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    textAlign: "center",
    flexShrink: 1,
  },
});
