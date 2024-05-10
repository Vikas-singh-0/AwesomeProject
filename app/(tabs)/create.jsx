import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import icons from "../../constants/icons";
import { getDocumentAsync } from "expo-document-picker";
import CustomButton from '../../components/CustomButton';
import { createVideo } from "../../lib/appwrite";
import { router } from "expo-router";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker  = async (seletType) => {
     const res = await getDocumentAsync({
      type: seletType === 'image' ? ['image/png', 'image/jpg'] : ['video/mp4', 'video/gif']
     })
     console.log(res);
     if(!res.canceled) {
      if(seletType  === 'image') {
        setForm({...form, thumbnail: res.assets[0]})
      }
      if(seletType  === 'video') {
        setForm({...form, video: res.assets[0]})
      }
     } else {
      setTimeout(() => {
        Alert.alert('Docuemnt picked', JSON.stringify(res, null, 2))
      }, 200);
     }
  }

  const submit = async () => {
    if(!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert('Please fill in all values.')
    }
    try {
      await createVideo({...form, userId: 1});
      Alert.alert('Success', 'Post submitted');
      router.push('/home');
      setUploading(true);
    } catch (error) {
      Alert.alert(error.message)
    } finally {
      setForm({
        title: '',
        thumbnail: null,
        video: null,
        prompt: ''
      })
      // setUploading(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-semibold">Upload VIdeo</Text>
        <FormField
          title="Video Title"
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-white font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video source={{uri: form.video.uri}} className = 'w-full h-64 rounded-xl' useNativeControls resizeMode={ResizeMode.COVER} isLooping></Video>
            ) : (
              <View className="w-full h-40 px-4 bg-black-200 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source = {icons.upload} resizeMode='contain' className='w-1/2 h-1/2'/>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className="text-base text-white font-pmedium">
              Thumbnail Image
            </Text>
            <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image source={{uri: form.thumbnail.uri}} className = 'w-full h-64 rounded-xl' resizeMode='contain'></Image>
            ) : (
              <View className="w-full h-16 px-4 bg-black-200 rounded-2xl flex-row items-center justify-center">
                  <Image source = {icons.upload} resizeMode='contain' className='w-5 h-5'/>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI prompt"
          value={form.prompt}
          // placeholder={"The Prompt you used to create the video"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton title="Submit & Publish" handlePress={submit} isLoading={uploading} containerStyles="mt-7"></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
