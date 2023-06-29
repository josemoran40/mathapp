import { StyleSheet, View, Text, Dimensions } from "react-native";
export default function PrimaryModal({ title, show, closeText, onClose }) {
  const closeModal = () => {
    onClose();
  };
  return (
    <View style={[styles.container, show ? {} : styles.containerClose]}>
      <View style={styles.box}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.button} onPress={closeModal}>
            {closeText}
          </Text>
        </View>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    minHeight: windowHeight,
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  containerClose: {
    display: "none",
  },

  box: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    minHeight: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 30,
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    width: "auto",
  },
  button: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});
