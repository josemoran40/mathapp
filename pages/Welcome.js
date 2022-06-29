import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Alert  } from 'react-native';

export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={{uri:'https://upload.wikimedia.org/wikipedia/commons/c/c3/Deus_mathematics.png'}}
          style={{ width: 150, height:150 }}
        />
      </View>
      <Text style={styles.title}>MathApp</Text>
      <View style={styles.button} >
        <Text style={styles.buttonText}  onPress={()=>navigation.push('Question')}>Iniciar sesión</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  button: {
    backgroundColor: '#FCFF76',
    paddingVertical:30,
    width:'80%',
    borderRadius:20,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  logo: {
    height: 240,
    width: 240,
    backgroundColor: '#8AA8FF',
    borderRadius: 240 / 2,
    marginBottom: 100,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 36,
    marginBottom: 35
  },
  buttonText:{
    fontSize:20
  }
});
