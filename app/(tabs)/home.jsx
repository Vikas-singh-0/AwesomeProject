import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchBox from "../../components/SearchBox";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";

const home = () => {
  const { data: posts, refetch, isLoading } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getAllPosts);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
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
            <View className=" my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-green-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-pmedium text-white">
                    User
                  </Text>
                </View>
                <View className=" mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchBox otherStyles="" />
              <View className=" w-full pt-5 pb-8">
                <Text className="text-green-50 text-lg font-pregular mb-3">
                  Latest Videos
                </Text>
                <Trending posts={latestPosts} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Be the first to upload the video"
          />
        )}
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing} />
        }
      />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
