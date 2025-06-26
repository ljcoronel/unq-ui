import { View } from "react-native";
import GameCartList from "@/components/GameCartList/gameCartList";
import GameCartPurchase from "@/components/GameCartPurchase/gameCartPurchase";
import { cartWithGamesStyles } from "@/components/CartWithGames/cartWithGames.styles";
import { GameCart } from "@/types/gameCart.type";

type CartWithGamesProps = {
  games: GameCart[];
  total: number;
  onPress: () => void;
};

const CartWithGames = ({ games, total, onPress }: CartWithGamesProps) => {
  return (
    <View style={cartWithGamesStyles.cartWithGamesContainer}>
      <GameCartList games={games} />
      <GameCartPurchase total={total} onPress={onPress} />
    </View>
  );
};

export default CartWithGames;
