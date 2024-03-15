import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function Menu({ route, navigation }) {
  const levels = route.params.levels;
  const classUid = route.params.uid;
  const explanation = route.params.explanation;
  const [user, setUser] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const [currentLevel, setCurrentLevel] = useState(null);

  async function getUser() {
    const document = doc(db, "users/", auth.currentUser.uid);
    const docSnap = await getDoc(document);
    if (docSnap.exists()) {
      setUser(docSnap.data());
      const classes_ = docSnap.data().classes;
      const class_ = classes_.filter((item) => item.class === classUid)[0] || 0;
      setCurrentLevel(class_.level || 0);
      console.log(class_.level);
    } else {
      console.log("No such document!");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  const Item = ({ item, index }) => {
    const { problem, level, color } = item;
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor: color,
            opacity: index == currentLevel ? 1 : 0.3,
          },
        ]}
      >
        <View>
          <Text style={styles.title}>{problem}</Text>
          <Text style={styles.subtitle}>{level}</Text>
        </View>

        {index == currentLevel && (
          <View style={styles.button}>
            <Button
              title="Jugar"
              color="black"
              onPress={() =>
                navigation.push("Question", {
                  ...item,
                  classUid,
                  indexLevel: index,
                })
              }
              style={styles.buttonText}
            >
              Jugar
            </Button>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.button, styles.explanation]}>
        <TouchableOpacity
          onPress={() => navigation.push("Animation", explanation)}
        >
          <Text style={styles.buttonText}>Explicación</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={levels}
        renderItem={Item}
        keyExtractor={(item) => item.uid}
        initialScrollIndex={0}
        onScrollToIndexFailed={() => console.log("failed")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    height: 200,
    justifyContent: "space-between",
    borderRadius: 5,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  subtitle: {
    fontSize: 20,
    color: "white",
  },
  button: {
    backgroundColor: "white",
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginTop: 20,
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 20,
  },
  learn: {
    padding: 20,
    backgroundColor: "#CACFD2",
    marginVertical: 8,
    borderRadius: 5,
  },
  explanation: {
    width: "100%",
    marginBottom: 8,
    paddingVertical: 10,
  },
});
