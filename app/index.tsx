import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
    return (
        <View className="bg-red-200 flex-1 justify-center items-center">
            <Text className="text-red-600">Tekst</Text>
            <StatusBar style="auto" />
            <Link href="/profile">Go to profile</Link>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})