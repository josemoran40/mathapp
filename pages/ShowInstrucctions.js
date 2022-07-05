import { useEffect, useState } from "react";
import { Alert, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TextAnimator from "../components/TextAnimation";

export default function ShowInstruccions({ navigation, route }) {


    const _onFinish = async () => {
        console.log(index + 1, route.params.length)
        if (index + 1 == route.params.length) return
        setText(null)
    };

    const [text, setText] = useState(route.params[0])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (!text) {
            if (route.params.length > index + 1) {
                setText(route.params[index + 1])
                setIndex(index + 1)
            }
        }
    }, [text])

    return <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
        {text && <TextAnimator
            content={text}
            textStyle={styles.textStyle}
            style={styles.container}
            duration={1000}
            onFinish={_onFinish}
        />}
        {index + 1 == route.params.length && <TouchableOpacity style={styles.button} onPress={()=>navigation.pop()}>
            <Text>Listo!</Text>
        </TouchableOpacity>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100
    },
    containerStyle: {},
    textStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 14
    },
    button: {
        backgroundColor: 'orange',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30
    },
})