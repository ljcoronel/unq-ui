import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { colors } from "@/theme/colors";
import { useAuth } from "@/context/AuthContext";
import {headerStyles} from "@/constants/styles";

export default function TabsLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.violet,
        tabBarInactiveTintColor: colors.grey2,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
        },
        animation: "shift",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "CART",
          headerShown: true,
            headerTitleStyle: headerStyles.header,
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <Image
              source={{ uri: user?.image }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: colors.violet,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
