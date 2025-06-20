import { Image } from 'react-native';

const loadingGif = require('@/assets/images/loading.gif');

export default function Loading() {
  return (
    <Image
      source={loadingGif}
      style={{
        width: 30,
        height: 30,
      }}
    />
  );
}
