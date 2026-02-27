import { Image} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const PageHeader = () => {
    return (
        <>
            <Image source={images.bg} className='absolute w-full z-0'/>
            <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto'/>
        </>
    )
}

export default PageHeader;