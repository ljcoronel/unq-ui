import { Image, Text, View } from "react-native";
import { gameCartStyles } from "@/components/GameCart/gameCart.styles";
import { GameCart as GameCartType } from "@/types/gameCart.type";

type GameCartProps = {
  game: GameCartType;
};

const GameCart = ({ game }: GameCartProps) => {
  return (
    <View style={gameCartStyles.gameCartContainer}>
      <Image
        style={gameCartStyles.gameCartImage}
        source={{ uri: game.mainImage }}
      />
      <View style={gameCartStyles.gameCartDetails}>
        <Text style={gameCartStyles.gameCartTitle}>{game.name}</Text>
        <Text style={gameCartStyles.gameCartPrice}>
          {`${game.price.currency} ${game.price.amount.toFixed(2).replace(".", ",")}`}
        </Text>
      </View>
    </View>
  );
};

export default GameCart;
