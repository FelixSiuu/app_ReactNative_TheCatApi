import { Stack } from 'expo-router';

export default function BreedsLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: 'Breeds' }}
      />
      <Stack.Screen
        name="List"
        options={{ headerShown: true, title: 'Breeds List' }}
      />
    </Stack>
  );
}
