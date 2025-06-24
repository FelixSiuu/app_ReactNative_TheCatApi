import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import type { ListItem } from '@/app/(tabs)/(Voting)/History';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

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
          <Pressable style={styles.closeButton} onPress={onClose}>
            <SimpleLineIcons name="close" size={24} color="white" />
          </Pressable>

          <Image
            source={image.url}
            style={{
              width: '100%',
              height: '100%',
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
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
  },
});
