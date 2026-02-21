import {View, Text} from 'react-native'
import {useEffect, useState} from "react";
import {isLoggedIn} from "@/services/appwrite";
import {useRouter} from "expo-router";

const Profile = () => {

    const router = useRouter();
    const [isLogged, setIsLogged] = useState<boolean | null>(null)

    useEffect(() => {
        isLoggedIn().then(setIsLogged)
    }, []);

    useEffect(() => {
        if (!isLogged) {
            router.replace("/login")
        }
    }, [isLogged, router]);


    return (


        <View>
            <Text>Profile</Text>
        </View>
    )
}
export default Profile