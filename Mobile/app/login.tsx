import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SafeScreen from "../components/SafeScreen";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in</Text>
        <View style={styles.form}>
          <Text style={styles.label}>SIGN IN WITH EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={email}
            onChangeText={setEmail}
          />
          <Text style={[styles.label, { marginTop: 24 }]}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin(email, password)}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : "Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#222",
    marginBottom: 32,
  },
  form: {
    width: "90%",
    maxWidth: 400,
  },
  label: {
    fontSize: 20,
    color: "#222",
    fontWeight: "500",
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 2,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: colors.violet,
    borderRadius: 6,
    marginTop: 32,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
  },
});
