import { View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  value: number;
};

export default function Stars({ value }: Props) {
  const array = ['', '', '', '', ''];

  return (
    <View style={{ flexDirection: 'row', gap: 5 }}>
      {array.map((_, index) => {
        return (
          <AntDesign
            key={index}
            name={index + 1 <= value ? 'star' : 'staro'}
            size={14}
            color="#efb23d"
          />
        );
      })}
    </View>
  );
}
