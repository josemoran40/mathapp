import { useEffect, useState } from "react";
import { Alert, StyleSheet, View, TouchableOpacity, Text, SafeAreaView, FlatList } from "react-native";
import TextAnimator from "../components/TextAnimation";

export default function ShowInstruccions({ navigation, route }) {


    const _onFinish = async () => {
        if (index + 1 == route.params.length) return
        setText([...text, route.params[index + 1]])
        setIndex(index + 1)
    };

    const [text, setText] = useState([route.params[0]])
    const [index, setIndex] = useState(0)

    const Item = ({ item, index }) => {
        return <TextAnimator
            content={item}
            textStyle={index == 0? styles.textTitble: styles.textStyle}
            style={styles.containerStyle}
            duration={1000}
            onFinish={_onFinish}
        />
    };

    return <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={text}
                renderItem={Item}
                keyExtractor={item => item}
                initialScrollIndex={0}
                onScrollToIndexFailed={() => console.log('failed')}
            />
            {index + 1 == route.params.length && <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
                <Text>Listo!</Text>
            </TouchableOpacity>}
        </SafeAreaView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100
    },
    containerStyle: {
        
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10
    },
    textStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 14
    },
    
    textTitble: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 14
    },
    button: {
        backgroundColor: '#CACFD2',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
})