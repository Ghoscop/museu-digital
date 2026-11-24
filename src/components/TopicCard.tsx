
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Topic } from "../data/topics";
import { COLORS } from "../theme/colors";

interface Props {
  topic: Topic;
  onPress: () => void;
}

export default function TopicCard({ topic, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={`Abrir exposição: ${topic.title}`}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={topic.icon as any}
          size={27}
          color={COLORS.accent}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.axis}>{topic.axis}</Text>

        <Text style={styles.title}>{topic.title}</Text>

        <Text style={styles.description}>
          {topic.description}
        </Text>

        <Text style={styles.year}>{topic.year}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color={COLORS.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
  },

  axis: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 5,
  },

  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  year: {
    color: COLORS.primary,
    fontSize: 11,
    marginTop: 8,
  },
});
