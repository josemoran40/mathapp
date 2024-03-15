import { Text, TouchableOpacity } from "react-native";

export default function GoTo({ navigation, path, text, color }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color || "#3498DB",
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginRight: 15,
        borderRadius: 10,
      }}
      onPress={() => {
        navigation.push(path);
      }}
    >
      <Text style={{ color: "white" }}>{text}</Text>
    </TouchableOpacity>
  );
}
