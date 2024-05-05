import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import icons from '../constants/icons';
import { router, usePathname } from "expo-router";

const SearchBox = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
      <View className="border-2 w-full h-16 px-4 bg-slate-600 justify-center space-x-2 flex-row focus:border-secondary-100 items-center border-black-200 rounded-xl">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={query}
          onChangeText={(e) => setQuery(e)}
          placeholder="Serch for videos"
        />
        <TouchableOpacity onPress={() => {
          if(!query) {
            return Alert.alert('Missing query', 'PLease input something to search for in database')
          }
          if(pathname.startsWith('/search')) {
            router.setParams({query})
          }else {
            router.push(`/search/${query}`)
          }
        }}>
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
        </TouchableOpacity>
      </View>
  );
};

export default SearchBox;
