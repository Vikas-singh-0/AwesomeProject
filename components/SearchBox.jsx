import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import icons from '../constants/icons';

const SearchBox = ({
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  keyboardType,
  ...props
}) => {
  const [showPassword, SetshowPassword] = useState(false);
  return (
      <View className="border-2 w-full h-16 px-4 bg-slate-600 justify-center space-x-2 flex-row focus:border-secondary-100 items-center border-black-200 rounded-xl">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
        />
        <TouchableOpacity>
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
        </TouchableOpacity>
      </View>
  );
};

export default SearchBox;
