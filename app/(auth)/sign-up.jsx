import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async() => {
    if (!form.username || !form.email || !form.password) Alert.alert('Error', 'Please fill all the fields');
    setIsSubmitting(true);
    try {
      const user = await createUser(form.username, form.email, form.password);
      // global state management
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full p-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold mb-10 min-w-[80%]">
            {" "}
            Sign Up on Aura{" "}
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => {
              setForm({ ...form, username: e });
            }}
            otherStyles="mt-7"
            placeholder="username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="email"
          />
          <FormField
            title="password"
            value={form.password}
            placeholder="hello"
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            containerStyles="mt-10"
            handlePress={submitForm}
            isLoading={isSubmitting}
          />
          <View className='text-white pt-5 justify-center items-center gap-2 flex-row'>
            <Text className = 'text-lg text-green-100 font-pregular'>Already have an account? </Text>
            <Link className = 'text-lg text-secondary-200 font-semibold' href='/sign-in'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
