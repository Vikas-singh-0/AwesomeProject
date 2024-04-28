import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white color">
      <Text className = "font-pblack text-3xl">Artified</Text>
      <StatusBar style="auto" animated = {true} />
      <Link href='profile' className="bg-red-500 text-white">Go to Profile</Link>
    </View>
  );
}

