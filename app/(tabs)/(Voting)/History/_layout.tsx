import { Stack, router } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colorMap } from '@/src/config';

export default function HistoryLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Vote History',
          headerRight: () => (
            <Pressable
              onPress={() => router.replace('/History/Favs')}
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
