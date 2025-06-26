import { Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../theme/colors";
import { useEffect, useState } from "react";
import { api } from "@/config/axios.config";
import { sectionTitle } from "@/constants/styles";
import SafeScreen from "@/components/SafeScreen";
import GameList from "@/components/GameList";
import { Game } from "@/types/games.types";

export default function HomeScreen() {
  const [featuredAndRecommended, setFeaturedAndRecommended] = useState<Game[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("/games/recommended");
      setFeaturedAndRecommended(data);
    };
    fetchData();
  }, []);

  return (
    <SafeScreen>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <Text style={sectionTitle.text}>Featured and Recommended</Text>
        <GameList games={featuredAndRecommended} />
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: colors.lightGrey,
    padding: 16,
    gap: 10,
  },
  text: {
    fontSize: 24,
    color: colors.darkGrey,
  },
});
