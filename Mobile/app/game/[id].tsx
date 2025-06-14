import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SafeScreen from "@/components/SafeScreen";

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const navigation = useNavigation();

  return (
    <ScrollView>
      <Text>Game Screen</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
