import { Stack } from 'expo-router';

export default function VotingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: 'Voting' }}
      />
      <Stack.Screen
        name="Settings"
        options={{ headerShown: true, title: 'Settings' }}
      />
    </Stack>
  );
}
