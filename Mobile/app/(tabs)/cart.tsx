import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import UserService from "@/services/UserService";
import {Cart as CartType} from "@/types/cart.type";
import {colors} from "@/theme/colors";
import CartWithoutGames from "@/components/CartWithoutGames/cartWithoutGames";
import CartWithGames from "@/components/CartWithGames/cartWithGames";

const Cart = () => {
    const router = useRouter();
    const [cart, setCart] = useState<CartType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        UserService.getTheCartOfLoggedUser()
            .then((response) => setCart(response))
            .finally(() => setLoading(false));
    }, [])

    if (loading || !cart) {
        return (
            <View>
                <ActivityIndicator size="large"/>
            </View>
        )
    }

    const total = cart.games.reduce((total, game) => total + game.price.amount, 0)

    return (
        <View style={styles.container}>
            {cart.games.length === 0 ? (
                <CartWithoutGames onPress={() => router.push("/(tabs)/home")}/>
            ) : (
                <CartWithGames games={cart.games} total={total} onPress={() => router.push("/purchase")}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grey,
    },
});

export default Cart;