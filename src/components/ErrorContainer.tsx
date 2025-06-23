import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colorMap, defaultErrorText } from '../config';

const error_cat = require('@/assets/images/icon_error_cat.png');

type Props = {
  errorText: string;
  handleRetry: () => void;
};

export default function ErrorContainer({
  errorText = defaultErrorText,
  handleRetry,
}: Props) {
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
        source={error_cat}
        style={{
          width: 100,
          height: 100,
        }}
      />

      <Text style={{ color: '#858585' }}>{errorText}</Text>

      <TouchableOpacity
        onPress={handleRetry}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
          borderRadius: 20,
          height: 40,
          width: 100,
          borderWidth: 1,
          borderColor: colorMap['retry'],
        }}
      >
        <FontAwesome name="rotate-right" size={14} color={colorMap['retry']} />

        <Text
          style={{
            color: colorMap['retry'],
            fontWeight: 400,
            lineHeight: 16,
            fontSize: 14,
          }}
        >
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );
}
