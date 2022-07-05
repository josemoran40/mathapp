import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native";

export default function Tops(){
    const [users, setUsers] = ([])
    const db = getFirestore();

    async function getLevels() {
        const document = collection(db,'users')
        const docSnap = await getDocs(document);
        // setUsers(docSnap.forEach((doc) => {
        //     doc.data()
        //   }));
   }

   useEffect(() => {
       getLevels()
   }, [])

   const Item = ({ item }) => {
    return <View style={[styles.item]}>
        <Text>{item.email}</Text>
    </View>
};

    return <SafeAreaView style={styles.container}>
    <FlatList
        data={users}
        renderItem={Item}
        keyExtractor={item => item.id}
        initialScrollIndex={0}
        onScrollToIndexFailed={() => console.log('failed')}
    />
</SafeAreaView>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        padding: 20,
        marginVertical: 8,
        height: 200,
        justifyContent: 'space-between',
        borderRadius: 5
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        color: 'white'
    },
    subtitle: {
        fontSize: 20,
        color: 'white'
    },
    button: {
        backgroundColor: 'white',
        width: 100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        alignSelf: 'flex-end'
    },
    buttonText: {
        fontSize: 20,
    }
});