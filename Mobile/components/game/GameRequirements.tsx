import { Requirement } from "@/types/games.types";
import { StyleSheet, Text, View } from "react-native";

export default function GameRequirements(requirement: {
  requirement: Requirement;
}) {
  return (
    <View style={styles.requirementsContainer}>
      <Text style={styles.title}>REQUIREMENTS</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.filed}>OS: </Text>
        <Text>{requirement.requirement.os}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.filed}>Processor </Text>
        <Text>{requirement.requirement.processor}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.filed}>Memory: </Text>
        <Text>{requirement.requirement.memory.toString()}gb</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.filed}>Graphics </Text>
        <Text>{requirement.requirement.graphics}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10,
  },
  requirementsContainer: {
    padding: 20,
  },
  fieldContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 10,
  },
  filed: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 700,
  },
});
