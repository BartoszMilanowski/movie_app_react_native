import {View, Text, Image, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from "react";
import {getCurrentUser, isLoggedIn} from "@/services/appwrite";
import {Redirect} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const Profile = () => {

    const [isLogged, setIsLogged] = useState<boolean | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                await isLoggedIn()
                const userData = await getCurrentUser()
                setUser(userData)
                setIsLogged(true)
            } catch {
                setIsLogged(false)
            }
        }
        loadUser()
    }, []);

    if (isLogged === null) return (
        <ActivityIndicator size='large' color='#000ff' className='mt-10 self-center'/>
    )

    if (!isLogged) return (
            <Redirect href="/login"/>
    )


    return (
        <View className='bg-primary flex-1'>
            <Image source={images.bg} className='absolute w-full z-0'/>
            <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto'/>
            <View className='items-center w-full min-h-16 mt-10'>
                <Text className='text-white text-xl mb-1'>{user?.name}</Text>
                <Text className='text-gray-300 mb-2'>{user?.email}</Text>
                <Text className='text-gray-400 text-sm'>ID: {user?.$id}</Text>
            </View>


        </View>

    )
}
export default Profile