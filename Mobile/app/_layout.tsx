import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { GamesProvider } from "../context/GamesContext";
import { UserProvider } from "../context/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {headerStyles} from "@/constants/styles";

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
                  headerTitleStyle: headerStyles.header,
                }}
              />
              <Stack.Screen
                name="game/[id]"
                options={{
                  headerShown: true,
                  headerTitleStyle: headerStyles.header,
                }}
              />
              <Stack.Screen
                name="user/[id]"
                options={{
                  headerShown: true,
                  headerTitleStyle: headerStyles.header,
                }}
              />
            </Stack>
          </UserProvider>
        </GamesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
