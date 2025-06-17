import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Breeds() {
  return (
    <View>
      <Link href={'/BreedList'}>to BreedList</Link>
    </View>
  );
}
