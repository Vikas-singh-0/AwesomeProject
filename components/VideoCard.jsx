import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    users,
  },
}) => {
  // console.log(props);
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-4  border-2">
      <View className="flex-row items-center px-4 p-0.5 mb-14  border-2 w-full">
        <Image
          source={{ uri: 'https://gravatar.com/avatar/d9f4bc8b5b8fef0d2dfc451de2e7397e?s=400&d=robohash&r=x' }}
          className="h-[50px] w-[50px] bg-slate-50 rounded-lg"
        />
        <View className="ml-3 justify-center flex-1 gap-y-1">
          <Text
            className="font-semibold text-sm text-white overflow-auto w-full"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="text-xs text-white">{"username"}</Text>
        </View>
        <View>
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          resizeMode={ResizeMode.CONTAIN}
          className="w-full h-60 rounded-[35px] mt-3 bg-white/10"
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="h-60 w-full rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full"
            resizeMode="contain"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
