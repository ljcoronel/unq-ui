import {Text, TextInput, View} from "react-native";
import BuyButton from "@/components/BuyButton/buyButton";
import {purchaseFormStyles} from "@/components/PurchaseForm/purchaseForm.styles";

const PurchaseForm = ({ name, setName, number, setNumber, cvv, setCvv, expiration, setExpiration, onPress, error}) => {
    return (
        <View style={purchaseFormStyles.userCardForm}>
            <View style={purchaseFormStyles.cardDetail}>
                <Text style={purchaseFormStyles.cardDetailText}>
                    CARD HOLDER NAME
                </Text>
                <TextInput style={purchaseFormStyles.input} value={name} onChangeText={setName} autoCapitalize={"characters"}/>
            </View>
            <View style={purchaseFormStyles.cardDetail}>
                <Text style={purchaseFormStyles.cardDetailText}>
                    NUMBER
                </Text>
                <TextInput style={purchaseFormStyles.input} value={number} onChangeText={setNumber} keyboardType={"number-pad"} maxLength={16}/>
            </View>
            <View style={purchaseFormStyles.cardDetail}>
                <Text style={purchaseFormStyles.cardDetailText}>
                    CVV
                </Text>
                <TextInput style={purchaseFormStyles.input} value={cvv} onChangeText={setCvv} keyboardType={"number-pad"} maxLength={3}/>
            </View>
            <View style={purchaseFormStyles.cardDetail}>
                <Text style={purchaseFormStyles.cardDetailText}>
                    EXPIRATION DATE
                </Text>
                <TextInput style={purchaseFormStyles.input} value={expiration} onChangeText={setExpiration} maxLength={5}/>
            </View>
            <BuyButton onPress={onPress}/>
            {error &&
                <Text style={purchaseFormStyles.error}>
                    {error.message}
                </Text>
            }
        </View>
    )
}

export default PurchaseForm;