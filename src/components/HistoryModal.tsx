import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Image } from 'expo-image';
import type { ListItem } from '@/app/(tabs)/(Voting)/History';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import dayjs from 'dayjs';
import { colorMap } from '../config';
import VotingButton from './VotingButton';

type Props = ListItem & {
  onClose: () => void;
  isVoting: boolean;
  handleVoteAgain: ({
    value,
    imgId,
  }: {
    value: ListItem['value'];
    imgId: ListItem['image_id'];
  }) => void;
};

export default function HistoryModal({
  onClose,
  value,
  image,
  created_at,
  sub_id,
  image_id,
  isVoting,
  handleVoteAgain,
}: Props) {
  const [isInfoModalVisible, setIsInfoModalVisible] = useState<boolean>(false);

  const InfoModal = () => (
    <Modal
      animationType="slide"
      visible={isInfoModalVisible}
      transparent={true}
    >
      <Pressable
        onPress={() => setIsInfoModalVisible(false)}
        style={styles.closeInfoModalArea}
      ></Pressable>

      <View style={styles.InfoModalView}>
        <View style={styles.rowContainer}>
          <Text style={styles.InfoModalText}>You voted at: </Text>

          <Text style={[styles.InfoModalText, styles.boldText]}>
            {dayjs(created_at).format('DD/MM/YYYY HH:mm:ss')}
          </Text>

          <Text style={styles.InfoModalText}> LT</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.InfoModalText}>By: </Text>

          <Text style={[styles.InfoModalText, styles.boldText]}>{sub_id}</Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal
      animationType="fade"
      visible={true}
      transparent={true}
      onRequestClose={onClose}
    >
      <InfoModal />

      <View style={styles.HistoryModalView}>
        <View style={styles.headerContainer}>
          <TouchableHighlight
            style={styles.highlightButton}
            onPress={() => setIsInfoModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="information-variant"
              size={16}
              color="white"
            />
          </TouchableHighlight>

          <FontAwesome
            name={value === 1 ? 'thumbs-up' : 'thumbs-down'}
            size={24}
            color={value === 1 ? colorMap['vote-up'] : colorMap['vote-down']}
            style={{
              transform: [
                {
                  rotate: value === 1 ? '-10deg' : '10deg',
                },
              ],
            }}
          />

          <TouchableHighlight style={styles.highlightButton} onPress={onClose}>
            <Ionicons name="close-sharp" size={16} color="white" />
          </TouchableHighlight>
        </View>

        <Image
          source={image.url}
          style={{
            width: '100%',
            height: '100%',
          }}
          contentFit="contain"
        />

        <View style={styles.footerContainer}>
          <VotingButton
            type="vote-down"
            onPress={() =>
              handleVoteAgain({
                value: 0,
                imgId: image_id,
              })
            }
            disabled={isVoting || value === 0}
            buttonBgColor={
              value === 0 ? colorMap['vote-disabled'] : colorMap['vote-down']
            }
            iconColor={'white'}
          />

          <VotingButton
            type="vote-up"
            onPress={() =>
              handleVoteAgain({
                value: 1,
                imgId: image_id,
              })
            }
            disabled={isVoting || value === 1}
            buttonBgColor={
              value === 1 ? colorMap['vote-disabled'] : colorMap['vote-up']
            }
            iconColor={'white'}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  HistoryModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    zIndex: 10,
    left: 0,
    top: 0,
  },
  footerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    zIndex: 10,
    left: 0,
    bottom: 0,
  },
  highlightButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  closeInfoModalArea: {
    flex: 1,
  },
  InfoModalView: {
    position: 'relative',
    backgroundColor: '#474747',
    gap: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  topBorder: {
    width: 50,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#b3b3b3',
    marginHorizontal: 'auto',
    marginBottom: 5,
  },
  InfoModalText: {
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 500,
    fontSize: 15,
  },
});
