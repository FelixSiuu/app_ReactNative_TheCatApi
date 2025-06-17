import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff6841',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 600,
        },
        tabBarStyle: {
          height: 'auto',
          minHeight: 60,
          paddingTop: 5,
          paddingBottom: 5,
        },
        animation: 'shift',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Voting',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'thumbs-up-down' : 'thumbs-up-down-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
