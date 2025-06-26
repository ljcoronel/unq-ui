import {
  Text,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { colors } from "../../theme/colors";
import { useEffect, useState, useRef, useCallback } from "react";
import { sectionTitle } from "@/constants/styles";
import SafeScreen from "@/components/SafeScreen";
import GameList from "@/components/GameList";
import { Game } from "@/types/games.types";
import { searchGames } from "@/services/search.service";

export default function SearchScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchGames = useCallback(
    async (reset = false, searchQuery: string, pageNum: number = 1) => {
      if (!searchQuery) return;
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("query", searchQuery);
        queryParams.append("page", pageNum.toString());
        const data = await searchGames(queryParams.toString());
        if (reset) {
          setGames(data.list);
        } else {
          setGames((prev) => [...prev, ...data.list]);
        }
        setHasMore(data.amountOfPages > data.currentPage);
      } catch (e) {
        setHasMore(false);
      }
      setLoading(false);
      setInitialLoad(false);
    },
    []
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (search.trim() === "") {
      setGames([]);
      setHasMore(true);
      setInitialLoad(true);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchGames(true, search, 1);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, fetchGames]);

  const handleEndReached = () => {
    if (!loading && hasMore && search.trim() !== "") {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(false, search, nextPage);
    }
  };

  return (
    <SafeScreen>
      <View style={{ flex: 1, padding: 16, gap: 5 }}>
        <Text style={sectionTitle.text}>SEARCH GAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter a search term"
          placeholderTextColor={colors.darkGrey}
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <GameList games={[item]} />}
          ListEmptyComponent={
            !loading && !initialLoad && search.trim() !== "" ? (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No se encontraron resultados
                </Text>
              </View>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  Comienza a buscar juegos
                </Text>
              </View>
            )
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.darkGrey} />
                <Text style={styles.loadingText}>Cargando más juegos...</Text>
              </View>
            ) : null
          }
          contentContainerStyle={styles.container}
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
    flexGrow: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.darkGrey,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  noResultsText: {
    color: colors.darkGrey,
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  loadingText: {
    color: colors.darkGrey,
    marginTop: 8,
  },
});
