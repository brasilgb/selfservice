import apios from "@/services/api";
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
// import { Image } from 'expo-image';

export default function Index() {
    const [empresa, setEmpresa] = useState<any>([]);
    const router = useRouter();
    useEffect(() => {
        const getEmpresa = async () => {
            await apios.get("empresa")
                .then((res) => {
                    const data = res.data.data;
                    setEmpresa(data);
                })
        };
        getEmpresa();
    }, []);

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
            <View className="flex-1 flex items-center justify-start bg-gray-white w-full">
                <StatusBar style='light' />
                <View className="flex-1 items-center justify-center bg-blue-900 w-full rounded-b-3xl shadow-slate-700">
                    <View className="flex items-center">
                        <Image
                            className="h-[127] w-[350]"
                            source={require('@/assets/images/logoeplus.png')}
                        />
                        <View className="mt-10 items-center">
                            <Text className="text-3xl font-bold text-white">Bem vindo ao nosso autoatendimento</Text>
                            <Text className="text-2xl text-white">Selecione abaixo o serviço desejado</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-1 items-center justify-center w-full px-10">
                    <TouchableOpacity
                        onPress={() => router.push('/services')}
                        className="bg-red-400 py-4 w-full items-center rounded-md"
                    >
                        <Text className="text-xl font-bold text-white uppercase">Gerar Orçamento</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>

    )
}