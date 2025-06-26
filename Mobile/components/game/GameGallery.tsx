import { Image, StyleSheet, View } from "react-native";

export default function GameGallery(multimedia: {
  multimedia: { url: string }[];
}) {
  return (
    <View style={styles.multimediaContainer}>
      {multimedia.multimedia.slice(0, 6).map((img, idx) => (
        <View key={idx} style={styles.imageContainer}>
          <Image source={{ uri: img.url }} style={styles.gameImage} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  multimediaContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "48%",
  },
  gameImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    marginBottom: 10,
  },
});
