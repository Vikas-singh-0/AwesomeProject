import { View, Text, Image } from "react-native";
import React from "react";
import images from "../constants/images";

const EmptyState = ({title, subTitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-green-100">{subTitle}</Text>
      <Text className="text-2xl font-pmedium text-white">{title}</Text>
    </View>
  );
};

export default EmptyState;
