import { StatusBar } from "expo-status-bar";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LightBulb from "../components/Icons/LightBulb";
import PrimaryModal from "../components/Modals/PrimaryModal";

export default function Question({ route, navigation }) {
  const question = route.params;
  const initialTime = 20;
  const [time, setTime] = useState(initialTime);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const timerRef = useRef(time);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        // Alert.alert('Se ha aabado el tiempo! 🙊', 'Intentalo de nuevo', [
        //     { text: "OK", onPress: () => navigation.pop() }
        // ])
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const submitAnswer = (id) => {
    if (question.options[id].answer) {
      setLevelAndScore();
      Alert.alert("Respuesta correcta! 😎", "", [
        { text: "OK", onPress: () => navigation.pop() },
      ]);
    } else {
      Alert.alert("Respuesta incorrecta ☹️ \nintentalo de nuevo", "", [
        { text: "OK", onPress: () => navigation.pop() },
      ]);
    }
  };

  async function getUser() {
    const document = doc(db, "users/", auth.currentUser.uid);
    const docSnap = await getDoc(document);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  async function setLevelAndScore() {
    const document = doc(db, "users/" + auth.currentUser.uid);
    await updateDoc(document, {
      score: user.score + (time * 100) / initialTime,
      currentLevel: question.id + 1,
    });
  }
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={20}
        fill={(time * 100) / initialTime}
        tintColor={question.color}
        backgroundColor="black"
      >
        {(fill) => (
          <View>
            <Text style={{ fontSize: 24 }}>{time} seg</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={styles.center}>
        <Text style={styles.subtitle}>Elige la opción correcta</Text>
        <Text style={styles.title}>{question.problem}</Text>
      </View>
      <View style={styles.clueModal}>
        <LightBulb onPress={() => Alert.alert("working")} />
      </View>
      <View>
        <View style={styles.flex}>
          <TouchableOpacity
            onPress={() => submitAnswer(0)}
            style={[styles.button, styles.blue]}
          >
            <Text style={styles.text}>{question.options[0].value}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => submitAnswer(1)}
            style={[styles.button, styles.green]}
          >
            <Text style={styles.text}>{question.options[1].value}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex}>
          <TouchableOpacity
            onPress={() => submitAnswer(2)}
            style={[styles.button, styles.red]}
          >
            <Text style={styles.text}>{question.options[2].value}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => submitAnswer(3)}
            style={[styles.button, styles.yellow]}
          >
            <Text style={styles.text}>{question.options[3].value}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PrimaryModal title="Hola" show={showModal} setShow={setShowModal} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    paddingBottom: 20,
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
    backgroundColor: "white",
    position: "relative",
  },
  elipse: {
    width: "100%",
    borderRadius: 1750,
    height: 400,
    top: -200,
    backgroundColor: "#FCFF76",
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
  },
  button: {
    width: "50%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  blue: {
    backgroundColor: "#3498DB",
  },
  red: {
    backgroundColor: "#E74C3C",
  },
  green: {
    backgroundColor: "#2ECC71",
  },
  yellow: {
    backgroundColor: "#F1C40F",
  },
  timerBar: {
    width: "80%",
    backgroundColor: "#8AA8FF",
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
    fontSize: 22,
  },
  clueModal: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
  },
});
