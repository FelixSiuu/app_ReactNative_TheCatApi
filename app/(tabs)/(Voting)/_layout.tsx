import { VotingSettingsProvider } from '@/src/context';
import { Stack } from 'expo-router';

export default function VotingLayout() {
  return (
    <VotingSettingsProvider>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: 'Voting' }}
        />
        <Stack.Screen
          name="Settings"
          options={{ headerShown: true, title: 'Settings' }}
        />
      </Stack>
    </VotingSettingsProvider>
  );
}
