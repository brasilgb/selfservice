import { Button } from '@/components/Button';
import Section from '@/components/section';
import { colors } from '@/styles/colors';
import { maskMoney } from '@/Util/mask';
import { FontAwesome6 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function Orcamento() {
    const params = useLocalSearchParams();
    const router = useRouter();

    return (
        <Animated.View
            entering={FadeIn}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00000040'
            }}
        >
            <View className="flex-1 flex-col items-center justify-center w-full">
                <StatusBar style='light' backgroundColor={colors.blue[900]} />
                <View className='bg-white flex-1 w-full mt-6 px-0.5'>
                    <View className='bg-blue-900 mt-6 rounded-t-2xl py-4'>
                        <Text className='text-2xl text-yellow-900 text-center uppercase'>Orçamento Gerado</Text>
                    </View>
                    <Section
                        title="Serviço Solicitado"
                        description={`${params.servico}`}
                    />
                    <Section
                        title="Marca"
                        description={`${typeof params.marca === 'undefined' ? 'N/A' : params.marca}`}
                    />
                    <Section
                        title="Modelo"
                        description={`${typeof params.modelo === 'undefined' ? 'N/A' : params.modelo}`}
                    />
                    <Section
                        title="Descrição"
                        description={`${params.descricao === 'undefined' ? 'N/A' : params.descricao}`}
                    />
                    <View className='flex flex-row items-center justify-between mt-20 px-4'>
                        <Text className='text-xl uppercase text-gray-200 bg-blue-900 py-1 px-2 rounded'>Valor do Orçamento</Text>
                        <View className='bg-blue-900 h-1 flex-1' />
                        <Text className='text-4xl text-gray-200 bg-blue-500 p-4 rounded-full'>{maskMoney(`${params.valor}`)}</Text>
                    </View>
                    <View className="flex-1 flex-row items-center justify-between w-full px-10">
                        <Button
                            onPress={() => router.push('/services')}
                            title={<FontAwesome6 name="arrow-left" size={22} />}
                        />
                        <Button
                            onPress={() => router.push('/(tabs)')}
                            title='Sair'
                        />
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}
