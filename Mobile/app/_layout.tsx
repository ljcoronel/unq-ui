import { Stack } from "expo-router";
import {UserProvider} from "@/context/UserContext";
import MainView from "@/components/MainView/mainView";

export default function RootLayout() {
  return (
      <UserProvider>
          <MainView>
            <Stack initialRouteName="login" screenOptions={{ animation: "slide_from_bottom" }}>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="purchase" options={{ headerTitle: "CHECKOUT" }} />
            </Stack>
          </MainView>
      </UserProvider>
  );
}
