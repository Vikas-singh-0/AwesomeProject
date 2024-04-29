import { Image, Pressable, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-web";
import icons from '../constants/icons';

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  keyboardType,
  ...props
}) => {
  const [showPassword, SetshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-red-100 font-pmedium mx-5">{title}</Text>
      <View className="border-2 w-full h-16 px-4 bg-black-100 justify-center flex-row focus:border-secondary-100 items-center border-black-200 rounded-xl">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          secureTextEntry={title === "password" && !showPassword}
        />
        {title === "password" && (
          <Pressable
            onPress={() => {
              SetshowPassword(!showPassword);
            }}
          >
            <Image className="w-6 h-6" resizeMode="contain" source={!showPassword ? icons.eye : icons.eyeHide}/>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FormField;
