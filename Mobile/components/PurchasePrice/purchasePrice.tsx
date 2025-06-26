import {Text, View} from "react-native";
import {purchasePriceStyles} from "@/components/PurchasePrice/purchasePrice.styles";
import {gameCartPurchaseStyles} from "@/components/GameCartPurchase/gameCartPurchase.styles";

type PurchasePriceProps = {
    total: number;
}

const PurchasePrice = ({ total } : PurchasePriceProps) => {
    return (
        <View style={purchasePriceStyles.priceContainer}>
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
        </View>
    )
}

export default PurchasePrice;