import { StyleSheet, View, Text, Dimensions } from "react-native";
export default function PrimaryModal({ title, show, setShow }) {
  const closeModal = () => {
    setShow(false);
  };
  return (
    <View style={[styles.container, show ? {} : styles.containerClose]}>
      <View style={styles.box}>
        <View>
          <Text>{title}</Text>
          <Text>{title}</Text>
        </View>
        <View>
          <Text onPress={closeModal}>Listo</Text>
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
  },
});
