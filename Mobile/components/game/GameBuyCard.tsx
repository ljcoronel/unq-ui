import { colors } from "@/theme/colors";
import { useGames } from "@/context/GamesContext";
import { FullGame } from "@/types/games.types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import UserService from "@/services/UserService";
import { Cart } from "@/types/cart.type";

export default function GameBuyCard({ game }: { game: FullGame }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addGameToCart } = useGames();
  const [error, setError] = useState("");
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCart = async () => {
    try {
      setLoading(true);
      const response = await UserService.getTheCartOfLoggedUser();
      setCart(response);
    } catch (e) {
      setError("Error al obtener el carrito");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleAddGameToCart = async (id: string) => {
    try {
      setIsLoading(true);
      await addGameToCart(id);
      await getCart();
      setIsLoading(false);
      router.push(`/(tabs)/cart`);
    } catch (e) {
      setError("Error al agregar el juego al carrito");
    }
  };

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  if( loading || !cart) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.buyCardView}>
      <View style={styles.buyCardContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Buy</Text>
          <Text style={styles.price}>
            {game.price.currency} {game.price.amount.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleAddGameToCart(game.id);
          }}
          style={[
            styles.buyButton,
            (isLoading || cart.games.some((g) => g.id === game.id)) && styles.buyButtonDisabled
          ]}
          disabled={isLoading || cart.games.some((g) => g.id === game.id)}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buy}>Buy</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buyCardView: {
    padding: 20,
  },
  buyCardContainer: {
    padding: 10,
    width: "100%",
    backgroundColor: colors.grey2,
    borderRadius: 10,
  },
  priceContainer: {
    color: colors.lightGrey,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginBottom: 15,
  },
  buyButton: {
    backgroundColor: colors.green,
    borderRadius: 10,
    paddingVertical: 15,
  },
  buyButtonDisabled: {
    backgroundColor: colors.grey, 
    opacity: 0.5,
  },
  price: {
    fontSize: 25,
    fontWeight: 800,
    color: colors.lightGrey,
    fontFamily: "Inter",
  },
  buy: {
    textAlign: "center",
    fontFamily: "Inter",
    color: colors.darkGrey,
    fontSize: 20,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 16,
  },
});
