import { Button } from "@/components/Button";
import apios from "@/services/api";
import { colors } from "@/styles/colors";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, Text, Image, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function Services() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isFocused = useIsFocused();

    const [servicos, setServicos] = useState<any>([]);
    const [marcas, setMarcas] = useState<any>([]);
    const [modelos, setModelos] = useState<any>([]);

    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedMarca, setSelectedMarca] = useState<any>(null);
    const [selectedModelo, setSelectedModelo] = useState<any>(null);
    const [serviceSimple, setServiceSimple] = useState<boolean>(true);

    useEffect(() => {
        const getServicos = async () => {
            await apios.post("servicos", {
                equipamento: params.type
            })
                .then((res) => {
                    const data = res.data.data;
                    setServicos(data);
                })
        };
        if (isFocused) {
            getServicos();
        }
    }, [params, isFocused]);

    useEffect(() => {
        const getMarcas = async () => {
            await apios.get("marcas")
                .then((res) => {
                    const data = res.data.data;
                    setMarcas(data);
                })
        };
        if (isFocused) {
            getMarcas();
        }
    }, [isFocused]);

    useEffect(() => {
        const getModelos = async () => {
            await apios.post("modelos", {
                marca: selectedMarca
            })
                .then((res) => {
                    const data = res.data.data;
                    setModelos(data);
                })
        };
        if (isFocused) {
            getModelos();
        }
    }, [selectedMarca, isFocused]);

    useEffect(() => {
        if (selectedService) {
            const simple = servicos.some((sf: any) => { return sf.id == selectedService && sf.simples == 1 });
            setServiceSimple(simple);
        }

    }, [servicos, selectedService, isFocused])

    const handleSubmit = async () => {

        if (!selectedService && serviceSimple) {
            Alert.alert('Serviço', 'Selecione o Serviço');
            return;
        }
        if (!selectedService && !serviceSimple) {
            Alert.alert('Serviço', 'Selecione o Serviço');
            return;
        }
        if (selectedService && !selectedMarca && !serviceSimple) {
            Alert.alert('Modelo', 'Selecione a Marca');
            return;
        }
        if (selectedService && selectedMarca && !selectedModelo && !serviceSimple) {
            Alert.alert('Modelo', 'Selecione o Modelo');
            return;
        }

        await apios.post("orcamentos", {
            "servico": selectedService,
            "marca": selectedMarca,
            "modelo": selectedModelo
        })
            .then((res) => {
                const data = res.data.data;
                router.push({ pathname: "/orcamento", params: data });
                setSelectedMarca([]);
                setSelectedModelo([]);
                setSelectedService([]);
            }).catch((err) => {
                Alert.alert('Erro', 'Não há orçamento para este produto!');
            })
    }

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
            <View className="flex-1 flex-col items-center justify-center bg-white px-6 w-full">
                <StatusBar style='light' backgroundColor={colors.blue[900]} />
                <View className="w-full bg-blue-900 p-8 rounded-lg shadow">
                    <View className="py-10 flex-row intens-center justify-center w-full">
                        <Image
                            className="h-[80] w-[220]"
                            source={require('@/assets/images/logoeplus.png')}
                        />
                    </View>
                    <Text className="text-4xl font-bold text-gray-50 pb-6 text-center uppercase">Orçamento</Text>
                    <Text className="text-2xl font-light text-gray-50 pb-6 text-center">Para gerar o orçamento selecione as opções relacionadas à <Text className="text-yellow-900">{params.name}</Text></Text>
                    <View className="rounded-md bg-white p-0.5 border">
                        <Picker
                            mode="dropdown"
                            dropdownIconColor={'red'}
                            selectedValue={selectedService}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedService(itemValue)
                            }
                            style={{ backgroundColor: colors.white }}
                        >
                            <Picker.Item label="Selecione o serviço" value={null} style={{ color: colors.red[400] }} />
                            {servicos?.map((servico: any) => (
                                <Picker.Item key={servico.id} label={servico.servico} value={servico.id} />
                            ))}

                        </Picker>
                    </View>
                    {!serviceSimple &&
                        <>
                            <View className="mt-4 rounded-md bg-white p-0.5 border">
                                <Picker
                                    mode="dropdown"
                                    dropdownIconColor={'red'}
                                    selectedValue={selectedMarca}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedMarca(itemValue)
                                    }
                                    style={{ backgroundColor: colors.white }}
                                    itemStyle={{
                                        fontSize: 30,
                                        fontFamily: 'Quicksand-Light',
                                    }}
                                >
                                    <Picker.Item label="Selecione o marca" value={null} style={{ color: colors.red[400] }} />
                                    {marcas?.map((marca: any) => (
                                        <Picker.Item key={marca.id} label={marca.marca} value={marca.id} />
                                    ))}
                                </Picker>
                            </View>
                            <View className="mt-4 rounded-md bg-white p-0.5 border">
                                <Picker
                                    mode="dropdown"
                                    dropdownIconColor={'red'}
                                    selectedValue={selectedModelo}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedModelo(itemValue)
                                    }
                                    style={{ backgroundColor: colors.white }}
                                >
                                    <Picker.Item label="Selecione o modelo" value={null} style={{ color: colors.red[400] }} />
                                    {modelos?.map((modelo: any) => (
                                        <Picker.Item key={modelo.id} label={modelo.modelo} value={modelo.id} />
                                    ))}
                                </Picker>
                            </View>
                        </>
                    }
                    <View className="mt-6 py-10">
                        <Button
                            onPress={() => handleSubmit()}
                            title='Gerar orçamento'
                        />
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}