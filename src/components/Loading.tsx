import { ActivityIndicator, View } from 'react-native';
import { colorMap } from '../config';

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <ActivityIndicator size={'large'} color={colorMap['primary']} />
    </View>
  );
}
