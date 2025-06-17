import { Pressable, StyleSheet, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  label: string;
  type: 'vote-up' | 'vote-down' | 'retry';
  onPress?: () => void;
  disabled?: boolean;
  isHighLightVoteDown?: boolean;
  isHighLightVoteUp?: boolean;
};

export default function Button({
  label,
  onPress,
  type,
  disabled,
  isHighLightVoteDown,
  isHighLightVoteUp,
}: Props) {
  const colorMap = {
    'vote-up': '#597ad0',
    'vote-down': '#f73132',
    retry: '#ff6841',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled ? '#cbcbcb' : colorMap[type],
          transform: [{ scale: pressed ? 0.96 : 1 }],
          filter:
            (type === 'vote-up' && isHighLightVoteUp) ||
            (type === 'vote-down' && isHighLightVoteDown)
              ? 'brightness(1.4)'
              : '',
        },
      ]}
    >
      {type === 'vote-up' && (
        <AntDesign name="smileo" size={18} color="white" />
      )}
      {type === 'vote-down' && (
        <AntDesign name="frowno" size={18} color="white" />
      )}
      {type === 'retry' && (
        <FontAwesome name="rotate-right" size={18} color="white" />
      )}
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 500 }}>
        {label}
      </Text>
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
    lineHeight: 1,
    height: 40,
    maxWidth: 200,
  },
});
