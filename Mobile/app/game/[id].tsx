import { Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function GameScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView>
      <Text>Game Screen</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
