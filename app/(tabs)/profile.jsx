import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserPosts, searchPosts, signIn } from "../../lib/appwrite";
import SearchBox from "../../components/SearchBox";
import { useGlobalContext } from "../../context/GlobalProvider";
import icons from "../../constants/icons";

const Profile = () => {
  const { setIsLoggedIn, user, setUser } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setUser(null);
    router.replace('/sign-in');
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="w-full justify-center items-center my-6 px-4 mb-12">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <View className = 'w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center'>
                <Image source={{uri: user?.avatar}} className='w-[90%] h-[90%] rounded-lg' resizeMode="cover"/>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found for search query"
            subTitle="Be the first to upload the video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
