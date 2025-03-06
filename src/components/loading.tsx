import { ActivityIndicator } from "react-native";

export function Loading() {
    return (
        <ActivityIndicator size='small' className="flex-1 items-center justify-center bg-blue-900" />
    )
}