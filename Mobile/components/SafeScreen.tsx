import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { ReactNode } from "react";
import { colors } from "@/constants/colors";

export default function SafeScreen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grey,
  },
});
