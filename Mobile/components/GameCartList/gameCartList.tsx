import { FlatList, Text, View } from "react-native";
import GameCart from "@/components/GameCart/gameCart";
import { gameCartListStyles } from "@/components/GameCartList/gameCartList.styles";
import { GameCart as GameCartType } from "@/types/gameCart.type";

type GameCartListProps = {
  games: GameCartType[];
};

const GameCartList = ({ games }: GameCartListProps) => {
  return (
    <FlatList
      style={gameCartListStyles.gameCartList}
      contentContainerStyle={gameCartListStyles.listFix}
      ListHeaderComponent={
        <View style={gameCartListStyles.headerContainer}>
          <Text style={gameCartListStyles.header}>Products</Text>
          <View style={gameCartListStyles.headerLine} />
        </View>
      }
      data={games}
      renderItem={({ item }) => <GameCart game={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={gameCartListStyles.listSeparator} />
      )}
    />
  );
};

export default GameCartList;
