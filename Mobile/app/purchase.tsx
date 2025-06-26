import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import PurchaseService from "@/services/PurchaseService";
import type { Cart } from "@/types/cart.type";
import { colors } from "@/theme/colors";
import PurchasePrice from "@/components/PurchasePrice/purchasePrice";
import PurchaseForm from "@/components/PurchaseForm/purchaseForm";
import { useAuth } from "@/context/AuthContext";

const Purchase = () => {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const { updateUser } = useAuth();

  useEffect(() => {
    UserService.getTheCartOfLoggedUser()
      .then((response) => setCart(response))
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = async () => {
    try {
      setError(null);
      await PurchaseService.purchaseGames(name, number, expiration, cvv);
      await updateUser();
      router.replace("/(tabs)/profile");
    } catch (e:unknown) {
      setError(e instanceof Error ? e : new Error("Error al comprar"));
    }
  };

  if (loading || !cart) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const total = cart.games.reduce(
    (total, game) => total + game.price.amount,
    0,
  );

  return (
    <View style={styles.container}>
      <PurchasePrice total={total} />
      <PurchaseForm
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        cvv={cvv}
        setCvv={setCvv}
        expiration={expiration}
        setExpiration={setExpiration}
        onPress={handlePurchase}
        error={error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    gap: 16,
    padding: 16,
    alignItems: "center",
  },
});

export default Purchase;
