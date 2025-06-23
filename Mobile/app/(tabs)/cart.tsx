import {ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from 'react-native'
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import UserService from "@/services/UserService";

type Cart = {
    games: {
        id: string,
        name: string,
        mainImage: string,
        tags: {
            id: string,
            name: string,
            image: {
                src: string
            }
        }[],
        price: {
            amount: number,
            currency: string
        }
    }[],
    user: {
        id: string,
        name: string,
        image: string
    }
}

const Cart = () => {
    const router = useRouter();
    const [cart, setCart] = useState<Cart | null>(null);
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
                <View style={styles.cartWithoutGamesContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/images/Vector.png')}/>
                    </View>
                    <View style={styles.addGamesContainer}>
                        <Text style={styles.text}>
                            Start by adding a game!
                        </Text>
                        <TouchableOpacity style={styles.addGamesButton} onPress={() => router.push("/(tabs)/home")}>
                            <Text style={styles.buttonText}>
                                Add games
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.cartWithGamesContainer}>
                    <FlatList
                        style={styles.gameCartList}
                        contentContainerStyle={styles.listFix}
                        ListHeaderComponent={
                            <View style={styles.headerContainer}>
                                <Text style={styles.header}>
                                    Products
                                </Text>
                                <View style={styles.headerLine}/>
                            </View>
                        }
                        data={cart.games}
                        renderItem={({item}) =>
                            <View style={styles.gameCartContainer}>
                                <Image style={styles.gameCartImage} source={{ uri: item.mainImage }}/>
                                <View style={styles.gameCartDetails}>
                                    <Text style={styles.gameCartTitle}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.gameCartPrice}>
                                        {`${item.price.currency} ${item.price.amount.toFixed(2).replace('.',',')}`}
                                    </Text>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={styles.listSeparator}/>}
                    />
                    <View style={styles.gameCartPurchaseContainer}>
                        <View style={styles.gameCartPurchaseDetails}>
                            <Text style={styles.gameCartPurchaseFees}>
                                Fees 1%
                            </Text>
                            <Text style={styles.gameCartPurchaseFees}>
                                $ {(total * 0.01).toFixed(2).replace('.',',')}
                            </Text>
                        </View>
                        <View style={styles.gameCartPurchaseDetails}>
                            <Text style={styles.gameCartPurchaseTotal}>
                                Total
                            </Text>
                            <Text style={styles.gameCartPurchaseTotal}>
                                $ {(total + total * 0.01).toFixed(2).replace('.',',')}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.buyButton} onPress={() => router.push("/purchase")}>
                            <Text style={styles.buttonText}>
                                Buy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
    },
    cartWithoutGamesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addGamesContainer: {
        height: 110,
        gap: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#212121',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 32,
    },
    addGamesButton: {
        backgroundColor: '#7DC215',
        width: 172,
        height: 56,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#212121',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 28,
    },
    cartWithGamesContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 16,
        alignItems: 'center',
    },
    gameCartList: {
        backgroundColor: '#898989',
        width: 377,
        height: 586,
        borderRadius: 8,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    listFix: {
        paddingBottom: 37
    },
    headerContainer: {
        gap: 16,
    },
    header: {
        color: '#EDEDED',
        fontFamily: 'Inter',
        fontSize: 24,
        lineHeight: 18,
    },
    headerLine: {
        height: 1,
        backgroundColor: '#EDEDED',
        marginBottom: 16,
    },
    gameCartContainer: {
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        paddingBottom: 8,
        gap: 8,
    },
    gameCartImage: {
        height: 161,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    gameCartDetails: {
        paddingHorizontal: 8,
        gap: 8,
    },
    gameCartTitle: {
        color: '#212121',
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 32,
        lineHeight: 28,
        textTransform: 'uppercase',
    },
    gameCartPrice: {
        color: '#6E1D72',
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 28,
    },
    listSeparator: {
        height: 16,
    },
    gameCartPurchaseContainer: {
        backgroundColor: '#898989',
        width: 377,
        height: 192,
        borderRadius: 8,
        paddingVertical: 24,
        paddingHorizontal: 16,
        gap: 16,
    },
    gameCartPurchaseDetails: {
        height: 28,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    gameCartPurchaseFees: {
        color: '#EDEDED',
        fontFamily: 'Inter',
        fontWeight: '300',
        fontSize: 18,
        lineHeight: 28,
    },
    gameCartPurchaseTotal: {
        color: '#EDEDED',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 28,
    },
    buyButton: {
        backgroundColor: '#7DC215',
        width: 345,
        height: 56,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Cart;