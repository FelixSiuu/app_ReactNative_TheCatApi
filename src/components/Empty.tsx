import { Image, Text, View } from 'react-native';

const empty = require('@/assets/images/icon_empty.png');

export default function Empty() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 20,
      }}
    >
      <Image
        source={empty}
        style={{
          width: 100,
          height: 100,
        }}
      />

      <Text style={{ color: '#858585' }}>
        Sorry, we couldn&#39;t find any results
      </Text>
    </View>
  );
}
