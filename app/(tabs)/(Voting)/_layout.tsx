import { colorMap } from '@/src/config';
import { VotingSettingsProvider } from '@/src/context';
import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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

        <Stack.Screen
          name="History"
          options={{
            headerShown: true,
            title: 'Vote History',
            headerRight: () => (
              <Pressable
                onPress={() => router.replace('/Favs')}
                style={styles.button}
              >
                <AntDesign
                  name="heart"
                  size={16}
                  color={colorMap['fav-active']}
                />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen
          name="Favs"
          options={{
            headerShown: true,
            title: 'Your Favorites',
            headerRight: () => (
              <Pressable
                onPress={() => router.replace('/History')}
                style={styles.button}
              >
                <FontAwesome5
                  name="history"
                  size={16}
                  color={colorMap['history']}
                />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </VotingSettingsProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 20,
    height: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
