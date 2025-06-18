import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: 'Breeds' }}
      />
      <Stack.Screen
        name="BreedList"
        options={{ headerShown: true, title: 'Breeds List' }}
      />
    </Stack>
  );
}
