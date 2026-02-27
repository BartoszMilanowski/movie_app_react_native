import {View, Text, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import React, {useState} from "react";
import {router} from "expo-router";
import {login} from "@/services/appwrite";
import PageHeader from "@/components/PageHeader";


const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            router.replace("/(tabs)/profile");
        } catch (e: any) {
            setError(e.message);
            Alert.alert("Wrong email or password");
        } finally {
            setLoading(false);
        }

    }

    return (
        <View className='bg-primary flex-1'>
           <PageHeader />
            <View className='items-center w-full min-h-16 mt-10'>
                <Text className='text-white text-5xl'>
                    Log In
                </Text>
            </View>
            <View className='my-5 px-4'>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor='#a8b5db'
                    className='p-6 border border-gray-300 rounded-full mb-3 text-white'
                    autoCapitalize='none'
                    keyboardType='email-address'
                />
                <View className='border border-gray-300 rounded-full mb-3 flex-row items-center'>
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor='#a8b5db'
                        className='p-6 text-white'
                        secureTextEntry={!showPassword}
                        autoCapitalize='none'
                        keyboardType='default'
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className='p-3 pr-7 ml-auto'
                        activeOpacity={0.7}
                    >
                        <Image
                            source={showPassword ? icons.hide : icons.view}
                            className='size-5'
                            tintColor='#fff'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex-row justify-between mx-5'>
                <TouchableOpacity
                    onPress={handleLogin}
                    className='bg-accent rounded-lg p-3'>
                    <Text className='text-white'>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='bg-red-400 rounded-lg p-3'
                    onPress={() => router.push('/')}>
                    <Text className='text-white'>Go back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;