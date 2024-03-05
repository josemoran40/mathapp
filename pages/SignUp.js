import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Input } from "react-native-elements";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Platform } from "react-native";

export default function SingUp({ navigation }) {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  function createUser() {
    createUserWithEmailAndPassword(auth, user, password)
      .then(async (res) => {
        const document = doc(db, "users/" + res.user.uid);
        await setDoc(document, {
          email: user,
          password: password,
          classes: [],
        });
        Alert.alert("Usuario creado! 🙌", "", [
          { text: "OK", onPress: () => navigation.pop() },
        ]);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Text style={styles.title}>FactorXpert</Text>
            <Input
              placeholder="Correo"
              onChangeText={(value) => setUser(value)}
              textContentType={"emailAddress"}
            />
            <Input
              placeholder="Contraseña"
              onChangeText={(value) => setPassword(value)}
              textContentType={"password"}
              secureTextEntry={true}
            />

            <TouchableOpacity onPress={createUser} style={styles.button}>
              <Text style={styles.buttonText}>Crear Usuario</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: "#CACFD2",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 240,
    width: 240,
    backgroundColor: "#8AA8FF",
    borderRadius: 240 / 2,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 35,
  },
  buttonText: {
    fontSize: 20,
  },
});
