import React from 'react'
import '@/styles/global.css';
import { Stack } from 'expo-router';
import {
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
} from "@expo-google-fonts/roboto";
import { Loading } from '@/components/loading';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {

    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    });

    if (!fontsLoaded) {
        return <Loading />;
    }

    return (
        <>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
            name="orcamento" 
            options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
                headerShown: false
            }}
            />
        </Stack>
        <StatusBar style="light" />
        </>
    )
}