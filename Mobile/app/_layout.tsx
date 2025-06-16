import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { GamesProvider } from "../context/GamesContext";
import { UserProvider } from "../context/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <GamesProvider>
          <UserProvider>
            <Stack screenOptions={{ headerShown: false }} initialRouteName="splash">
              <Stack.Screen name="splash" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
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
