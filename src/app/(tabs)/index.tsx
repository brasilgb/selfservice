import ManutencaoLink from "@/components/ManutencaoLink";
import apios from "@/services/api";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

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
            <View className="flex-1 flex items-center justify-start bg-gray-50 w-full">
                <StatusBar style='light' />
                <View className="flex-col items-center justify-center bg-blue-900 w-full rounded-b-3xl shadow-slate-700">
                    <View className="flex items-center py-8 mt-10">
                        <Image
                            className="h-[80] w-[220]"
                            source={require('@/assets/images/logoeplus.png')}
                        />
                        <View className="py-8 items-center">
                            <Text className="text-2xl font-bold text-white">Bem vindo ao nosso autoatendimento</Text>
                            <Text className="text-xl text-white">Precisa de um  orçamento rápido?</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-1 items-center justify-center">
                    <View className="flex-row flex-wrap items-center justify-center gap-10">
                        <ManutencaoLink title="Manutenção em" subtitle="Notebooks" image={require('@/assets/images/notebook.jpg')} />
                        <ManutencaoLink title="Manutenção em" subtitle="Smartphones" image={require('@/assets/images/smartphone.jpg')} />
                        <ManutencaoLink title="manutenção em" subtitle="Computadores" image={require('@/assets/images/computador.jpg')} />
                        <TouchableOpacity
                            onPress={() => router.push('/services')}
                            className="bg-gray-50 w-[40%] h-52 flex-col justify-around items-center  border-4 border-white rounded-md shadow shadow-zinc-600"
                        >
                            <FontAwesome5
                            name="tools"
                            size={90}
                            color={'#C8005590'}
                        />
                            <Text className="text-xl font-bold text-blue-900/80 uppercase">Outros serviços</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>

    )
}