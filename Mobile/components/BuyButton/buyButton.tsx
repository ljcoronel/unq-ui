import {Text, TouchableOpacity} from "react-native";
import {buyButtonStyles} from "@/components/BuyButton/buyButton.styles";
import {addGamesButtonStyles} from "@/components/AddGamesButton/addGamesButton.styles";

const BuyButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={buyButtonStyles.buyButton} onPress={onPress}>
            <Text style={addGamesButtonStyles.buttonText}>
                Buy
            </Text>
        </TouchableOpacity>
    )
}

export default BuyButton;