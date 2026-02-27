import {View, Text, Image, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from "react";
import {getCurrentUser, isLoggedIn, logout} from "@/services/appwrite";
import {Redirect, router} from "expo-router";
import PageHeader from "@/components/PageHeader";
import Toast from "react-native-toast-message";

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

    const handleLogout = async () => {
        try {
            await logout()
            router.replace('/')
            setIsLogged(false)

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Logout',
                visibilityTime: 3000,
                bottomOffset: 100
            })
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    // if (isLogged === null) return (
    //     <View className='bg-primary flex-1 justify-center items-center'>
    //         <ActivityIndicator size='large' color='#000ff' className='mt-10 self-center'/>
    //     </View>
    // )

    // if (!isLogged) return (
    //     <Redirect href="/login"/>
    // )


    return (
        <View className='bg-primary flex-1'>

            {isLogged === null ? (
                <ActivityIndicator size='large' color='#000ff' className='mt-10 self-center'/>
            ) : !isLogged ? (
                <Redirect href='/login'/>
            ) : (
                <>
                    <PageHeader/>
                    <View className='items-center w-full min-h-16 mt-10'>
                        <Text className='text-white text-6xl mb-5'> Hi {user?.name}</Text>
                        <Text className='text-gray-300 text-lg mb-2'>{user?.email}</Text>
                    </View>
                    <View className='flex-row ml-5 mt-10 gap-x-3'>
                        <TouchableOpacity
                            className='bg-accent rounded-lg p-3'
                        >
                            <Text className='text-white'>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleLogout()}
                            className='bg-red-400 rounded-lg p-3'
                        >
                            <Text className='text-white'>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )

            }


        </View>

    )
}
export default Profile