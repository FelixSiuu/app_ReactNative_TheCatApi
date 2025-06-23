import { Modal, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import type { ListItem } from '@/app/(tabs)/(Voting)/History';

type Props = ListItem & {
  onClose: () => void;
};

export default function HistoryModal({
  onClose,
  value,
  image,
  created_at,
  sub_id,
}: Props) {
  return (
    <Modal
      animationType="fade"
      visible={true}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={image.url}
            style={{
              width: 300,
              height: 300,
              position: 'static',
            }}
            contentFit="contain"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
