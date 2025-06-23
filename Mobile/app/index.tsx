import { StyleSheet, Text, View} from "react-native";
import Button from "@/components/Button/button";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Button title="Press me" onPress={() => alert("Button pressed!")} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})