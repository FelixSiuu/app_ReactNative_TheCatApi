import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';

type ButtonType = 'vote-up' | 'vote-down' | 'retry';

type Props = {
  label?: string;
  type: ButtonType;
  onPress?: () => void;
  disabled?: boolean;
  customStyle?: ViewStyle;
};

export default function Button({
  label,
  onPress,
  type,
  disabled = false,
  customStyle,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        customStyle,
        {
          transform: [{ scale: pressed ? 0.96 : 1 }],
          filter: pressed ? 'brightness(0.8)' : 'brightness(1)',
        },
      ]}
    >
      {type === 'vote-up' && (
        <Feather name="thumbs-up" size={20} color="white" />
      )}
      {type === 'vote-down' && (
        <Feather name="thumbs-down" size={20} color="white" />
      )}
      {type === 'retry' && (
        <FontAwesome name="rotate-right" size={18} color="white" />
      )}

      {!!label && (
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 400 }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    borderRadius: 20,
    height: 40,
    maxWidth: 200,
  },
});
