import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useCallback, useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { mainContext } from "../components/Context";

export default function Tops() {
  const [users, setUsers] = useState([]);
  const db = getFirestore();
  const { currentClass, currentUser } = useContext(mainContext);

  async function getLevels() {
    const document = collection(db, "users");
    const q = query(document);
    const docSnap = await getDocs(q);

    const data = [];
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });

    const userWithScore = [];
    data.forEach((user) => {
      user.classes.forEach((class_) => {
        if (class_.class === currentClass.uid) {
          userWithScore.push({
            email: user.email,
            score: Math.round(class_.score),
          });
        }
      });
    });

    userWithScore.sort((a, b) => b.score - a.score);
    console.log(currentUser);
    setUsers(userWithScore);
  }

  useFocusEffect(
    useCallback(() => {
      getLevels();
    }, [])
  );

  const Item = ({ item }) => {
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor: currentUser === item.email ? "#2ECC71" : "#CACFD2",
          },
        ]}
      >
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ width: "100%" }}>
        <FlatList
          data={users}
          renderItem={Item}
          keyExtractor={(item) => item.email}
          initialScrollIndex={0}
          onScrollToIndexFailed={() => console.log("failed")}
        />
      </SafeAreaView>
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
    padding: 20,
    backgroundColor: "white",
  },
  item: {
    padding: 20,
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: "#CACFD2",
    marginVertical: 3,
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "row",
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
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 20,
  },
  email: {
    fontSize: 18,
  },
  score: {
    fontWeight: "bold",
  },
});
