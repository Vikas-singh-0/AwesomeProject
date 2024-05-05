import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchPosts } from "../../lib/appwrite";
import SearchBox from "../../components/SearchBox";

const Search = () => {

    const {query} = useLocalSearchParams();

    const { data: posts, refetch } = useAppWrite(searchPosts(query));
  
    useEffect(() => {
        refetch();
    }, [query])

    return (
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => {
            return <VideoCard video = {item}/>;
          }}
          ListHeaderComponent={() => {
            return (
              <View className=" my-6 px-4 space-y-6">
                <View className="justify-between items-start flex-row mb-6">
                    <Text className="font-pmedium text-sm text-green-100">
                      Search Results
                    </Text>
                    <Text className="text-2xl font-pmedium text-white">
                      {query}
                    </Text>
                </View>
                <SearchBox initialQuery={query} />
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

export default Search;
