import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button } from 'react-native';


const DATA = [
    {
        id: '1',
        problem: '2x+3x*4',
        level: 'Factor comun',
        color: 'red'
    },
    {
        id: '2',
        problem: '3x+3x*4',
        level: 'Factor comun',
        color: 'red'
    },
    {
        id: '3',
        problem: '4x+3x*4',
        level: 'Factor comun',
        color: 'red'
    },
    {
        id: '4',
        problem: '2x+3x*4',
        level: 'Diferencia de cuadrados',
        color: 'blue'
    },
    {
        id: '5',
        problem: '3x+3x*4',
        level: 'Factor comun',
        color: 'blue'
    },
    {
        id: '6',
        problem: '4x+3x*4',
        level: 'Factor comun',
        color: 'blue'
    },
];



export default function Menu({navigation}) {
    const Item = ({ item }) => {
        const { problem, level, color } = item
        return <View style={[styles.item, { backgroundColor: color }]}>
            <View>
            <Text style={styles.title}>{problem}</Text>
            <Text style={styles.subtitle}>{level}</Text>
            </View>
            <View style={styles.button}>
                <Button title='Jugar' color='black' onPress={()=>navigation.push('Question')} style={styles.buttonText}>Jugar</Button>
            </View>
        </View>
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={Item}
                keyExtractor={item => item.id}
                initialScrollIndex={1}
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
        height: 300,
        justifyContent:'space-between',
        borderRadius:5
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
        width:100,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        alignSelf:'flex-end'
    },
    buttonText:{
        fontSize: 20,
    }
});