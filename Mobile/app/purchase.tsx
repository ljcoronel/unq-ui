import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import UserService from "@/services/UserService";
import {ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import PurchaseService from "@/services/PurchaseService";

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

const Purchase = () => {
    const router = useRouter();
    const [cart, setCart] = useState<Cart | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [expiration, setExpiration] = useState<string>('');

    useEffect(() => {
        UserService.getTheCartOfLoggedUser()
            .then((response) => setCart(response))
            .finally(() => setLoading(false));
    }, [])

    const handlePurchase = async () => {
        try {
            setError(null);
            await PurchaseService.purchaseGames(name, number, expiration, cvv);
            router.replace("/(tabs)/library");
        } catch (e:any) {
            setError(e);
        }
    }

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
            <View style={styles.priceContainer}>
                <View style={styles.priceDetails}>
                    <Text style={styles.priceDetailsFees}>
                        Fees 1%
                    </Text>
                    <Text style={styles.priceDetailsFees}>
                        $ {(total * 0.01).toFixed(2).replace('.',',')}
                    </Text>
                </View>
                <View style={styles.priceDetails}>
                    <Text style={styles.priceDetailsTotal}>
                        Total
                    </Text>
                    <Text style={styles.priceDetailsTotal}>
                        $ {(total + total * 0.01).toFixed(2).replace('.',',')}
                    </Text>
                </View>
            </View>
            <View style={styles.userCardForm}>
                <View style={styles.cardDetail}>
                    <Text style={styles.cardDetailText}>
                        CARD HOLDER NAME
                    </Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} autoCapitalize={"characters"}/>
                </View>
                <View style={styles.cardDetail}>
                    <Text style={styles.cardDetailText}>
                        NUMBER
                    </Text>
                    <TextInput style={styles.input} value={number} onChangeText={setNumber} keyboardType={"number-pad"} maxLength={16}/>
                </View>
                <View style={styles.cardDetail}>
                    <Text style={styles.cardDetailText}>
                        CVV
                    </Text>
                    <TextInput style={styles.input} value={cvv} onChangeText={setCvv} keyboardType={"number-pad"} maxLength={3}/>
                </View>
                <View style={styles.cardDetail}>
                    <Text style={styles.cardDetailText}>
                        EXPIRATION DATE
                    </Text>
                    <TextInput style={styles.input} value={expiration} onChangeText={setExpiration} maxLength={5}/>
                </View>
                <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
                    <Text style={styles.buttonText}>
                        Buy
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        gap: 16,
        padding: 16,
        alignItems:'center',
    },
    priceContainer: {
        backgroundColor: '#898989',
        width: 361,
        height: 120,
        borderRadius: 8,
        paddingVertical: 24,
        paddingHorizontal: 16,
        gap: 16,
    },
    priceDetails: {
        height: 28,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    priceDetailsFees: {
        color: '#EDEDED',
        fontFamily: 'Inter',
        fontWeight: '300',
        fontSize: 18,
        lineHeight: 28,
    },
    priceDetailsTotal: {
        color: '#EDEDED',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 28,
    },
    userCardForm: {
        width: 361,
        height: 472,
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 32,
    },
    cardDetail: {
        height: 64,
    },
    cardDetailText: {
        color: '#212121',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 28,
    },
    input: {
        backgroundColor: '#EDEDED',
        height: 36,
        paddingVertical: 0,
    },
    buyButton: {
        backgroundColor: '#7DC215',
        width: 345,
        height: 56,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#212121',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 28,
    },
});

export default Purchase;