import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { GamesProvider } from "../context/GamesContext";
import { UserProvider } from "../context/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <GamesProvider>
          <UserProvider>
            <Stack
              screenOptions={{ headerShown: false }}
              initialRouteName="splash"
            >
              <Stack.Screen name="splash" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="purchase"
                options={{
                  headerTitle: "CHECKOUT",
                  headerShown: true,
                  headerTitleStyle: styles.header,
                }}
              />
              <Stack.Screen
                name="game/[id]"
                options={{
                  headerShown: true,
                }}
              />
              <Stack.Screen
                name="user/[id]"
                options={{
                  headerShown: true,
                }}
              />
            </Stack>
          </UserProvider>
        </GamesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export const styles = StyleSheet.create({
  header: {
    color: colors.darkGrey,
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 25,
    lineHeight: 28,
  },
});
