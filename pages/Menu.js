import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

export default function Menu({ navigation }) {
    const [levels, setLevels] = useState([])
    const [user, setUser] = useState([])
    const db = getFirestore();
    const auth = getAuth();


    async function getLevels() {
        const factor =
            [
                'Factor comun',
                'ab+2bc = b(a+2c)',
                '2abc+2bc = 2bc(a+1)'
            ]

        const document = doc(db, 'levels/b0UMrsGPjuZyBtI3ha1p/')
        const docSnap = await getDoc(document);
        if (docSnap.exists()) {
            setLevels([{ learn: factor },...docSnap.data().levels])
        } else {
            console.log("No such document!");
        }
    }

    async function getUser() {
        const document = doc(db, 'users/', auth.currentUser.uid)
        const docSnap = await getDoc(document);
        if (docSnap.exists()) {
            setUser(docSnap.data())
        } else {
            console.log("No such document!");
        }
    }


    useFocusEffect(
        useCallback(() => {
            getUser()
            getLevels()
        }, [])
    )

    const Item = ({ item }) => {
        const { problem, level, color } = item
        if (!item.problem) {
            return <TouchableOpacity style={styles.learn} onPress={() => navigation.push('Animation', item.learn)}>
                <Text style={styles.subtitle}>Aprende {item.learn[0]}</Text>
            </TouchableOpacity>
        }
        return <View style={[styles.item, { backgroundColor: color, opacity: item.id >= user.currentLevel ? 1 : 0.3 }]}>
            <View>
                <Text style={styles.title}>{problem}</Text>
                <Text style={styles.subtitle}>{level}</Text>
            </View>
            {item.id >= user.currentLevel &&
                <View style={styles.button}>
                    <Button title='Jugar' color='black' onPress={() => navigation.push('Question', item)} style={styles.buttonText}>Jugar</Button>
                </View>
            }
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
        marginTop:20,
        alignSelf: 'flex-end'
    },
    buttonText: {
        fontSize: 20,
    },
    learn: {
        padding: 20,
        backgroundColor: 'black',
        marginVertical: 8,
        borderRadius: 5
    }
})