import {Text, View} from "react-native";
import BuyButton from "@/components/BuyButton/buyButton";
import {gameCartPurchaseStyles} from "@/components/GameCartPurchase/gameCartPurchase.styles";

const GameCartPurchase = ({ total, onPress }) => {
    return (
        <View style={gameCartPurchaseStyles.gameCartPurchaseContainer}>
            <View style={gameCartPurchaseStyles.gameCartPurchaseDetails}>
                <Text style={gameCartPurchaseStyles.gameCartPurchaseFees}>
                    Fees 1%
                </Text>
                <Text style={gameCartPurchaseStyles.gameCartPurchaseFees}>
                    $ {(total * 0.01).toFixed(2).replace('.',',')}
                </Text>
            </View>
            <View style={gameCartPurchaseStyles.gameCartPurchaseDetails}>
                <Text style={gameCartPurchaseStyles.gameCartPurchaseTotal}>
                    Total
                </Text>
                <Text style={gameCartPurchaseStyles.gameCartPurchaseTotal}>
                    $ {(total + total * 0.01).toFixed(2).replace('.',',')}
                </Text>
            </View>
            <BuyButton onPress={onPress}/>
        </View>
    )
}

export default GameCartPurchase;