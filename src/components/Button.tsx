import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { colorMap } from '../config';

type ButtonType = 'vote-up' | 'vote-down' | 'retry';

type Props = {
  label?: string;
  type: ButtonType;
  onPress?: () => void;
  disabled?: boolean;
  isHighLightVoteDown?: boolean;
  isHighLightVoteUp?: boolean;
  customStyle?: ViewStyle;
};

export default function Button({
  label,
  onPress,
  type,
  disabled = false,
  isHighLightVoteDown = false,
  isHighLightVoteUp = false,
  customStyle,
}: Props) {
  function calcButtonBgc({
    type,
    disabled,
    isHighLightVoteUp,
    isHighLightVoteDown,
  }: {
    type: ButtonType;
    disabled: boolean;
    isHighLightVoteUp: boolean;
    isHighLightVoteDown: boolean;
  }) {
    if (disabled) return colorMap['disabled'];

    if (type === 'vote-up' && isHighLightVoteUp) return colorMap['vote-up'];

    if (type === 'vote-down' && isHighLightVoteDown)
      return colorMap['vote-down'];
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        customStyle,
        {
          backgroundColor: calcButtonBgc({
            type,
            disabled,
            isHighLightVoteDown,
            isHighLightVoteUp,
          }),
          transform: [{ scale: pressed ? 0.96 : 1 }],
          filter: pressed ? 'brightness(0.8)' : 'brightness(1)',
        },
      ]}
    >
      {type === 'vote-up' && (
        <Feather name="thumbs-up" size={24} color="white" />
      )}
      {type === 'vote-down' && (
        <Feather name="thumbs-down" size={24} color="white" />
      )}
      {type === 'retry' && (
        <FontAwesome name="rotate-right" size={18} color="white" />
      )}

      {!!label && (
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
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
    paddingVertical: '5%',
    borderRadius: 20,
    height: 40,
    maxWidth: 200,
  },
});
