import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button } from 'react-native';
import {getFirestore, collection, doc, getDoc} from 'firebase/firestore'

export default function Menu({ navigation }) {
    const [levels, setLevels] = useState([])
    const db = getFirestore();
    
    async function getLevels() {
         const document = doc(db,'levels/b0UMrsGPjuZyBtI3ha1p/')
         const docSnap = await getDoc(document);
         if (docSnap.exists()) {
            setLevels(docSnap.data().levels)
          } else {
            console.log("No such document!");
          }
    }

    useEffect(() => {
        getLevels()
    }, [])

    const Item = ({ item }) => {
        const { problem, level, color } = item
        return <View style={[styles.item, { backgroundColor: color }]}>
            <View>
                <Text style={styles.title}>{problem}</Text>
                <Text style={styles.subtitle}>{level}</Text>
            </View>
            <View style={styles.button}>
                <Button title='Jugar' color='black' onPress={() => navigation.push('Question', item)} style={styles.buttonText}>Jugar</Button>
            </View>
        </View>
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={levels}
                renderItem={Item}
                keyExtractor={item => item.id}
                initialScrollIndex={0}
                onScrollToIndexFailed={() => console.log('failed')}
            />
        </SafeAreaView>
    );
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