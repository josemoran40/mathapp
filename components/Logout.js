import { getAuth, signOut } from "firebase/auth";
import { Text, TouchableOpacity } from "react-native";

export default function LogOut({navigation}) {
    const auth = getAuth();
    return <TouchableOpacity style={{backgroundColor:'red', paddingVertical:5,paddingHorizontal:15, marginRight:15, borderRadius:10}}
        onPress={() => {signOut(auth); navigation.pop()}}
    >
        <Text style={{color:'white'}}>Salir</Text>
    </TouchableOpacity>
}