import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Question() {

    const [time, setTime] = useState(100);
    const timerRef = useRef(time);

    useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);
    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={200}
                width={20}
                fill={time}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {
                    (fill) => (
                        <View>
                            <Text style={{ fontSize: 24 }}>{time} seg</Text>
                        </View>
                    )
                }
            </AnimatedCircularProgress>
            <View style={styles.center}>
                <Text style={styles.subtitle}>Elige la opción correcta</Text>
                <Text style={styles.title}>12x + 15x+ 3x</Text>
            </View>
            <View>
                <View style={styles.flex}>
                    <View style={[styles.button, styles.blue]}>
                        <Text style={styles.text}>Option 1</Text>
                    </View>
                    <View style={[styles.button, styles.green]}>
                        <Text style={styles.text}>Option 2</Text>
                    </View>
                </View>
                <View style={styles.flex}>
                    <View style={[styles.button, styles.red]}>
                        <Text style={styles.text}>Option 3</Text>
                    </View>
                    <View style={[styles.button, styles.yellow]}>
                        <Text style={styles.text}>Option 4</Text>
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 20,
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20
    },
    elipse: {
        width: '100%',
        borderRadius: 1750,
        height: 400,
        top: -200,
        backgroundColor: '#FCFF76',
        position: 'absolute',
        display: 'flex',
        alignItems: 'flex-end'
    },
    button: {
        width: '50%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    blue: {
        backgroundColor: '#2774FA'
    },
    red: {
        backgroundColor: '#228BED'
    },
    green: {
        backgroundColor: '#228BED'
    },
    yellow: {
        backgroundColor: '#2774FA'
    },
    timerBar: {
        width: '80%',
        backgroundColor: '#8AA8FF',
        borderRadius: 10,
        padding: 10
    }
    ,
    title: {
        fontSize: 36,
        marginBottom: 20
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 20
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white'
    }
});
