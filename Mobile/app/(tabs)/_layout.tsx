import {Tabs} from "expo-router";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{tabBarShowLabel: false, tabBarActiveTintColor: "#6E1D72"}}>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (<Ionicons name="home" color={color} />),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (<Ionicons name="search" color={color} />),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "CART",
                    tabBarIcon: ({color}) => (<Ionicons name="cart" color={color} />),
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (<Ionicons name="person-circle" color={color} />),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: 393,
        height: 68,
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingRight: 32,
        paddingBottom: 10,
        paddingLeft: 32,
    },
})