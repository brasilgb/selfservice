import React from 'react'
import { View, Text } from 'react-native';

interface SectionProps {
    title: string;
    description: string;
}

export default function Section({ title, description }: SectionProps) {
    
    return (
        <View className='mt-4 px-2'>
            <Text className='text-lg uppercase font-semibold'>{title}</Text>
            <Text className='text-xl border border-gray-400 bg-gray-50 p-2 rounded'>{description}</Text>
        </View>
    )
}
