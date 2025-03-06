import { colors } from '@/styles/colors';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.blue[900],
          borderTopWidth: 0,
          minHeight: 74
        },
        tabBarItemStyle: {
          paddingBottom: 34,
          paddingTop: 14
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.blue[500],
        tabBarInactiveTintColor: colors.gray[400]
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size = 600, color }) => <MaterialIcons size={35} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ size, color }) => <MaterialIcons size={35} name="post-add" color={color} />,
        }}
      />
    </Tabs>
  );
}
