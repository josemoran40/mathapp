import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Input } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { mainContext } from "../components/Context";

export default function Welcome({ navigation }) {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const { setCurrentUser } = useContext(mainContext);
  const auth = getAuth();

  function singIn() {
    signInWithEmailAndPassword(auth, user, password)
      .then((res) => {
        setCurrentUser(user);
        navigation.push("Classes");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Usuario o contraseña incorrecta");
      });
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
            <View style={styles.logo}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Deus_mathematics.png",
                }}
                style={{ width: 150, height: 150 }}
              />
            </View>
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

            <TouchableOpacity style={styles.button} onPress={singIn}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <Text
              style={styles.singUpButton}
              onPress={() => navigation.push("SingUp")}
            >
              Registrarse
            </Text>
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
  singUpButton: {
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
