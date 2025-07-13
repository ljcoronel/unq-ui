import { Text, TextInput, View } from "react-native";
import BuyButton from "@/components/BuyButton/buyButton";
import { purchaseFormStyles } from "@/components/PurchaseForm/purchaseForm.styles";

type PurchaseFormProps = {
  name: string;
  setName: (name: string) => void;
  number: string;
  setNumber: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  expiration: string;
  setExpiration: (value: string) => void;
  onPress: () => void;
  error: Error | null;
};

const PurchaseForm = ({
  name,
  setName,
  number,
  setNumber,
  cvv,
  setCvv,
  expiration,
  setExpiration,
  onPress,
  error,
}: PurchaseFormProps) => {
  return (
    <View style={purchaseFormStyles.userCardForm}>
      <View style={purchaseFormStyles.cardDetail}>
        <Text style={purchaseFormStyles.cardDetailText}>CARD HOLDER NAME</Text>
        <TextInput
          style={purchaseFormStyles.input}
          value={name}
          placeholder="Name"
          onChangeText={setName}
          autoCapitalize={"characters"}
        />
      </View>
      <View style={purchaseFormStyles.cardDetail}>
        <Text style={purchaseFormStyles.cardDetailText}>NUMBER</Text>
        <TextInput
          style={purchaseFormStyles.input}
          value={number}
          placeholder="1234 5678 9012 3456"
          onChangeText={setNumber}
          keyboardType={"number-pad"}
          maxLength={16}
        />
      </View>
      <View style={purchaseFormStyles.cardDetail}>
        <Text style={purchaseFormStyles.cardDetailText}>CVV</Text>
        <TextInput
          style={purchaseFormStyles.input}
          value={cvv}
          placeholder="3 digits"
          onChangeText={setCvv}
          keyboardType={"number-pad"}
          maxLength={3}
        />
      </View>
      <View style={purchaseFormStyles.cardDetail}>
        <Text style={purchaseFormStyles.cardDetailText}>EXPIRATION DATE</Text>
        <TextInput
          style={purchaseFormStyles.input}
          value={expiration}
          placeholder="MM/YY"
          onChangeText={setExpiration}
          maxLength={5}
        />
      </View>
      <BuyButton onPress={onPress} />
      {error && <Text style={purchaseFormStyles.error}>{error.message}</Text>}
    </View>
  );
};

export default PurchaseForm;
