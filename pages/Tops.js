import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs, getFirestore, query, orderBy } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";


export default function Tops() {
    const [users, setUsers] = useState([])
    const db = getFirestore();

    async function getLevels() {
        const document = collection(db, 'users')
        const q = query(document, orderBy("score", "desc"));
        const docSnap = await getDocs(q);
        const data = []
        docSnap.forEach((doc) => {
            data.push(doc.data())
        })
        setUsers(data)
    }

    useFocusEffect(
        useCallback(() => {
            getLevels()
        }, [])
      )

    const Item = ({ item }) => {
        return <View style={styles.item}>
            <Text>{item.email}</Text>
            <Text>{item.score}</Text>
        </View>
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: '100%' }}>
                <FlatList
                    data={users}
                    renderItem={Item}
                    keyExtractor={item => item.email}
                    initialScrollIndex={0}
                    onScrollToIndexFailed={() => console.log('failed')}
                />
            </SafeAreaView>
            <StatusBar style="auto" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 20,
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        backgroundColor: 'white'
    },
    item: {
        padding: 20,
        justifyContent: 'space-between',
        borderRadius: 5,
        backgroundColor: '#FCFF76',
        marginVertical: 3,
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
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