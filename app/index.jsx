import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoggedIn, isLoading } = useGlobalContext();
  console.log(isLoading, isLoggedIn);
  if (!isLoading && isLoggedIn) return <Redirect href='/home' />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full h-full px-8 justify-center items-center flex">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[138px] h-[84px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="w-[380px] h-[300px]"
          />
          <View className="relative mt-5">
            <Text className="text-white text-center font-pbold text-3xl">
              Discover endless possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              className="absolute -bottom-2 -right-9 w-[136px] h-[15px]"
              source={images.path}
              resizeMode="contain"
            />
          </View>
          <Text className="text-white mt-3 font-pregular">
            {" "}
            Where creativity meets innovation: Get your own{" "}
          </Text>
          <CustomButton
            title="Continue with Login!"
            containerStyles="w-full mt-7"
            handlePress={() => {router.push('/sign-in')}}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="white" style="light"/>
    </SafeAreaView>
  );
}
