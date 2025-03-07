import { useRouter } from 'expo-router';
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

type ManutencaoProps = {
    title: string;
    subtitle: string;
    image: any;
    data: any;
}

export default function ManutencaoLink({title, subtitle, image, data}: ManutencaoProps) {
    const router = useRouter();
    return (
        <TouchableOpacity 
        onPress={() => router.push(data)}
        className="bg-gray-50 border-4 border-white rounded-md shadow shadow-zinc-600 w-[40%] h-52"
        >
            <Image
                className="h-[60%] w-[100%] rounded-t-md"
                source={image}
            />
            <View className=' h-[40%] flex-col bg-gray-200 items-center justify-center w-full'>
            <Text className='text-lg font-light'>{title}</Text>
            <Text className='text-2xl font-semibold uppercase w-full text-center text-red-400'>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
}
