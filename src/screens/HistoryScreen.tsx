import React, { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import {
  clearEvents,
  getEvents,
  InteractionEvent,
} from "../services/interactionTracker";

const COLORS = {
  background: "#080D18",
  surface: "#101827",
  surfaceLight: "#162236",
  gold: "#D9B978",
  white: "#F5F3EE",
  muted: "#9BA8B9",
  border: "rgba(217,185,120,0.18)",
  green: "#77C9A5",
  red: "#E58B8B",
};

function getEventTitle(type: InteractionEvent["type"]) {
  const titles: Record<InteractionEvent["type"], string> = {
    screen_view: "Tela acessada",
    exhibition_open: "Exposição aberta",
    content_open: "Conteúdo aberto",
    challenge_answer: "Resposta enviada",
    challenge_complete: "Desafio concluído",
  };

  return titles[type] ?? type;
}

function getEventDescription(event: InteractionEvent) {
  const details = event.details ?? {};

  if (event.type === "challenge_answer") {
    const question = details.question;
    const correct = details.isCorrect;

    return [
      typeof question === "string" ? question : "Resposta registrada",
      typeof correct === "boolean"
        ? correct
          ? "Resposta correta"
          : "Resposta incorreta"
        : null,
    ]
      .filter(Boolean)
      .join(" • ");
  }

  if (event.type === "challenge_complete") {
    const score = details.score;
    const total = details.totalQuestions;
    if (typeof score === "number" && typeof total === "number") {
      return `Resultado: ${score} de ${total} acertos`;
    }
  }

  if (event.screen === "Exhibition" && typeof details.topicId === "string") {
    return `Tema: ${details.topicId}`;
  }

  if (typeof details.contentTitle === "string") {
    return details.contentTitle;
  }

  return `Área: ${event.screen}`;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function HistoryScreen() {
  const [events, setEvents] = useState<InteractionEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      const savedEvents = await getEvents();
      setEvents([...savedEvents].reverse());
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      Alert.alert("Erro", "Não foi possível carregar o histórico.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [loadEvents])
  );

  function handleClearHistory() {
    Alert.alert(
      "Limpar histórico",
      "Tem certeza de que deseja apagar todos os registros salvos neste dispositivo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await clearEvents();
              setEvents([]);
            } catch (error) {
              console.error("Erro ao limpar histórico:", error);
              Alert.alert("Erro", "Não foi possível apagar os registros.");
            }
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>MUSEU DIGITAL / DADOS DE USO</Text>
      <Text style={styles.title}>Histórico de interações</Text>
      <Text style={styles.subtitle}>
        Consulte os registros de navegação e participação armazenados neste
        dispositivo.
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryIcon}>
          <Ionicons name="analytics-outline" size={25} color={COLORS.gold} />
        </View>
        <View style={styles.summaryText}>
          <Text style={styles.summaryLabel}>EVENTOS REGISTRADOS</Text>
          <Text style={styles.summaryNumber}>{events.length}</Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadEvents}
          accessibilityRole="button"
          accessibilityLabel="Atualizar histórico"
        >
          <Ionicons name="refresh-outline" size={20} color={COLORS.gold} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Carregando registros...</Text>
        </View>
      ) : events.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons
            name="file-tray-outline"
            size={42}
            color={COLORS.muted}
          />
          <Text style={styles.emptyTitle}>Nenhuma interação registrada</Text>
          <Text style={styles.emptyDescription}>
            Navegue pelas exposições e responda aos desafios. As interações
            registradas aparecerão aqui.
          </Text>
        </View>
      ) : (
        <View style={styles.eventsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>REGISTROS RECENTES</Text>
            <Text style={styles.sectionHint}>Mais recentes primeiro</Text>
          </View>

          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventIcon}>
                <Ionicons
                  name={
                    event.type === "challenge_answer"
                      ? "help-circle-outline"
                      : event.type === "challenge_complete"
                      ? "trophy-outline"
                      : event.type === "exhibition_open"
                      ? "library-outline"
                      : event.type === "content_open"
                      ? "book-outline"
                      : "navigate-outline"
                  }
                  size={20}
                  color={COLORS.gold}
                />
              </View>

              <View style={styles.eventBody}>
                <Text style={styles.eventTitle}>
                  {getEventTitle(event.type)}
                </Text>
                <Text style={styles.eventDescription}>
                  {getEventDescription(event)}
                </Text>
                <Text style={styles.eventDate}>
                  {formatDate(event.timestamp)}
                </Text>
                <Text style={styles.eventMeta}>
                  Tela: {event.screen} • Sessão: {event.sessionId}
                </Text>
              </View>

              {event.type === "challenge_answer" &&
              event.details?.isCorrect === true ? (
                <Ionicons
                  name="checkmark-circle"
                  size={19}
                  color={COLORS.green}
                />
              ) : event.type === "challenge_answer" &&
                event.details?.isCorrect === false ? (
                <Ionicons
                  name="close-circle"
                  size={19}
                  color={COLORS.red}
                />
              ) : null}
            </View>
          ))}
        </View>
      )}

      {events.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearHistory}
          accessibilityRole="button"
        >
          <Ionicons name="trash-outline" size={17} color={COLORS.red} />
          <Text style={styles.clearButtonText}>Apagar histórico deste dispositivo</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.footerNote}>
        Os dados exibidos são armazenados localmente no dispositivo. Nesta
        etapa, eles ainda não são enviados para a API.
      </Text>
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
    paddingBottom: 40,
  },
  eyebrow: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.7,
    marginBottom: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "800",
    marginBottom: 9,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 27,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  summaryText: {
    flex: 1,
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  summaryNumber: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "800",
    marginTop: 3,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },
  eventsSection: {
    gap: 12,
  },
  sectionHeader: {
    marginBottom: 3,
  },
  sectionTitle: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  sectionHint: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  eventCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
  },
  eventIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },
  eventBody: {
    flex: 1,
  },
  eventTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 5,
  },
  eventDescription: {
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 7,
  },
  eventDate: {
    color: COLORS.gold,
    fontSize: 11,
    marginBottom: 5,
  },
  eventMeta: {
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 15,
  },
  emptyState: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
  },
  clearButton: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: "rgba(229,139,139,0.35)",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  clearButtonText: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: "700",
  },
  footerNote: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 24,
    textAlign: "center",
  },
});
