import React, { useCallback, useContext, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { mainContext } from "../components/Context";

export default function Classes({ navigation }) {
  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const { setCurrentClass } = useContext(mainContext);

  async function getClasses() {
    const collectionRef = await collection(db, "class");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const classes_ = [];
    querySnapshot.forEach((doc) => {
      classes_.push({ ...doc.data(), uid: doc.id });
    });

    setClasses(classes_);
  }

  async function getUser() {
    const document = doc(db, "users/", auth.currentUser.uid);
    const docSnap = await getDoc(document);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getUser();
      getClasses();
    }, [])
  );

  const Item = ({ item, index }) => {
    if (item) {
      return (
        <TouchableOpacity
          style={styles.learn}
          onPress={() => {
            setCurrentClass(item);
            navigation.push("Levels", item);
          }}
        >
          <Text style={{ fontSize: 20 }}>{item.class}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={classes}
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
});
