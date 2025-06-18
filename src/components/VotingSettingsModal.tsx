import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { FlatItemType } from '@/app/(tabs)/(Voting)/Settings';
import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { getImagesLimit } from '../config';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  content: FlatItemType;
  // onConfirm: (data: FlatItemType) => void;
};

export default function VotingSettingsModal({
  isVisible,
  onClose,
  content,
}: // onConfirm,
Props) {
  const [data, setData] = useState<FlatItemType>(content);

  useEffect(() => {
    setData(content);
  }, [content]);

  function handleValueChange(value: number) {
    setData((prev) => ({
      ...prev,
      original: value,
      value: value,
    }));
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.TopBtnGroup}>
            <Pressable onPress={onClose}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onClose();
              }}
            >
              <Text>OK</Text>
            </Pressable>
          </View>

          <View style={styles.contentWrapper}>
            <Text>{data.title}</Text>
            <Text>{data.value}</Text>
          </View>

          {data.key === 'limit' && (
            <Slider
              step={1}
              style={{ width: '100%', height: 40 }}
              minimumValue={getImagesLimit.min}
              maximumValue={getImagesLimit.max}
              minimumTrackTintColor="#c4b9b9"
              maximumTrackTintColor="#000000"
              value={data.original as number}
              onValueChange={handleValueChange}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    minHeight: 300,
    backgroundColor: 'white',
    padding: 20,
    gap: 20,
  },
  TopBtnGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
