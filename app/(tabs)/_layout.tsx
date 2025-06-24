import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colorMap } from '@/src/config';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="(Voting)"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colorMap['tabBarActiveTintColor'],
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 600,
        },
        tabBarStyle: {
          height: 60,
        },
        animation: 'shift',
      }}
    >
      <Tabs.Screen
        name="(Voting)"
        options={{
          title: 'Swipe',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'cards' : 'cards-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Breeds"
        options={{
          title: 'Breeds',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'book-search' : 'book-search-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
