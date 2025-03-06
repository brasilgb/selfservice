import { Button } from "@/components/Button";
import apios from "@/services/api";
import { colors } from "@/styles/colors";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function Services() {
    const router = useRouter();

    const [servicos, setServicos] = useState<any>([]);
    const [marcas, setMarcas] = useState<any>([]);
    const [modelos, setModelos] = useState<any>([]);

    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedMarca, setSelectedMarca] = useState<any>(null);
    const [selectedModelo, setSelectedModelo] = useState<any>(null);
    const [serviceSimple, setServiceSimple] = useState<boolean>(false);


    useEffect(() => {
        const getServicos = async () => {
            await apios.get("servicos")
                .then((res) => {
                    const data = res.data.data;
                    setServicos(data);
                })
        };
        getServicos();
    }, []);

    useEffect(() => {
        const getMarcas = async () => {
            await apios.get("marcas")
                .then((res) => {
                    const data = res.data.data;
                    setMarcas(data);
                })
        };
        getMarcas();
    }, []);

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
        getModelos();
    }, [selectedMarca]);

    useEffect(() => {
        if (selectedService) {
            const simple = servicos.some((sf: any) => { return sf.id == selectedService && sf.simples == 1 });
            setServiceSimple(simple);
        }
    }, [servicos, selectedService])

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
                <Text className="text-3xl font-medium text-gray-700 mb-2">Selecione o orçamento desejado</Text>
                <View className="w-full bg-blue-900 p-8 rounded-lg shadow">
                    <View className="rounded-md bg-white p-0.5 border">
                        <Picker
                            selectedValue={selectedService}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedService(itemValue)
                            }
                            style={{ backgroundColor: colors.white }}
                        >
                            <Picker.Item label="Selecione o serviço" value={null} />
                            {servicos?.map((servico: any) => (
                                <Picker.Item key={servico.id} label={servico.servico} value={servico.id} />
                            ))}

                        </Picker>
                    </View>
                    {!serviceSimple &&
                        <>
                            <View className="mt-4 rounded-md bg-white p-0.5 border">
                                <Picker
                                    selectedValue={selectedMarca}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedMarca(itemValue)
                                    }
                                    style={{ backgroundColor: colors.white }}
                                >
                                    <Picker.Item label="Selecione o marca" value={null} />
                                    {marcas?.map((marca: any) => (
                                        <Picker.Item key={marca.id} label={marca.marca} value={marca.id} />
                                    ))}
                                </Picker>
                            </View>
                            <View className="mt-4 rounded-md bg-white p-0.5 border">
                                <Picker
                                    selectedValue={selectedModelo}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedModelo(itemValue)
                                    }
                                    style={{ backgroundColor: colors.white }}
                                >
                                    <Picker.Item label="Selecione o modelo" value="0" />
                                    {modelos?.map((modelo: any) => (
                                        <Picker.Item key={modelo.id} label={modelo.modelo} value={modelo.id} />
                                    ))}
                                </Picker>
                            </View>
                        </>
                    }
                    <View className="mt-6">
                        <Button
                            onPress={() => router.push('/(tabs)')}
                            title='Gerar orçamento'
                        />
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}