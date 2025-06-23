import { StyleSheet, TouchableOpacity, ColorValue } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

type ButtonType = 'vote-up' | 'vote-down';

type Props = {
  type: ButtonType;
  onPress?: () => void;
  disabled?: boolean;
  buttonBgColor?: ColorValue;
  iconColor?: ColorValue;
};

export default function VotingButton({
  onPress,
  type,
  disabled = false,
  buttonBgColor,
  iconColor,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: buttonBgColor,
        },
      ]}
    >
      {type === 'vote-up' && (
        <Entypo name="check" size={32} color={iconColor} />
      )}

      {type === 'vote-down' && (
        <Entypo name="cross" size={36} color={iconColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: 80,
  },
});
