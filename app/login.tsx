import {View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import React, {useState} from "react";
import {router} from "expo-router";


const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <View className='bg-primary flex-1'>
            <Image source={images.bg} className='absolute w-full z-0'/>
            <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto'/>
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