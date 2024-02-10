import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";
import TextAnimator from "../components/TextAnimation";

export default function ShowInstruccions({ navigation, route }) {
  const [index, setIndex] = useState(0);

  const _onFinish = async () => {
    if (index + 1 == route.params.length) return;
  };

  const Item = ({ item, index }) => {
    return (
      <TextAnimator
        content={item.text}
        textStyle={index == 0 ? styles.textTitble : styles.textStyle}
        style={styles.containerStyle}
        duration={1000}
        onFinish={_onFinish}
      />
    );
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 20 }}>
      <TouchableOpacity
        onPress={() => {
          if (index + 1 != route.params.length) setIndex(index + 1);
        }}
      >
        <SafeAreaView style={styles.container}>
          <Item item={route.params[index]} />
        </SafeAreaView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  textStyle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
  },

  textTitble: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#CACFD2",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
