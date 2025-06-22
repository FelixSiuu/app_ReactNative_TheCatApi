import { Image, View } from 'react-native';

const loadingGif = require('@/assets/images/loading.gif');

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
      <Image
        source={loadingGif}
        style={{
          width: 30,
          height: 30,
        }}
      />
    </View>
  );
}
