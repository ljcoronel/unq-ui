import {Image, Text, View} from "react-native";
import AddGamesButton from "@/components/AddGamesButton/addGamesButton";
import {cartWithoutGamesStyles} from "@/components/CartWithoutGames/cartWithoutGames.styles";

const CartWithoutGames = ({ onPress }) => {
    return (
        <View style={cartWithoutGamesStyles.cartWithoutGamesContainer}>
            <View style={cartWithoutGamesStyles.imageContainer}>
                <Image source={require('../../assets/images/Vector.png')}/>
            </View>
            <View style={cartWithoutGamesStyles.addGamesContainer}>
                <Text style={cartWithoutGamesStyles.text}>
                    Start by adding a game!
                </Text>
                <AddGamesButton onPress={onPress} />
            </View>
        </View>
    )
}

export default CartWithoutGames;