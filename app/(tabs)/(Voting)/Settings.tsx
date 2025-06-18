import { useSettings } from '@/src/context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import VotingSettingsModal from '@/src/components/VotingSettingsModal';
import { colorMap, VotingSettingsType } from '@/src/config';
import { useRouter } from 'expo-router';

type ItemData = {
  key: string;
  title: string;
  value: string | number;
  original: any;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
};

type ModalState = ItemData;

export type FlatItemType = ItemData;

export default function Settings() {
  const router = useRouter();
  const { settings: defaultParams, updateSettings } = useSettings();

  const [newSettings, setNewSettings] = useState<VotingSettingsType>({
    limit: defaultParams.limit,
    mine_types: defaultParams.mine_types,
    size: defaultParams.size,
    has_breeds: defaultParams.has_breeds,
  });

  const DATA: ItemData[] = [
    {
      key: 'limit',
      title: 'Number of images to get each time :',
      value: newSettings.limit,
      original: newSettings.limit,
    },
    {
      key: 'mine_types',
      title: 'Images type :',
      value: newSettings.mine_types
        ? newSettings.mine_types
        : 'all ( jpg, png, gif )',
      original: newSettings.mine_types,
    },
    {
      key: 'size',
      title: 'Images size :',
      value: newSettings.size
        ? newSettings.size
        : 'all ( thumb, small, med, full )',
      original: newSettings.size,
    },
    {
      key: 'has_breeds',
      title: 'Has breeds data :',
      value:
        newSettings.has_breeds === ''
          ? 'random'
          : newSettings.has_breeds === true
          ? 'yes'
          : 'no',
      original: newSettings.has_breeds,
    },
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [modalContent, setModalContent] = useState<ModalState>(DATA[0]);

  const Item = ({ onPress, item }: ItemProps) => {
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.settingItem}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={[calcTextStyles(item)]}>{item.value}</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
        </View>
      </TouchableHighlight>
    );
  };

  const calcTextStyles = (item: ItemData): TextStyle => {
    const { key, original } = item;

    const textDiffColor = colorMap['settings-textDiffColor'];

    const textDiffStyleObject = { color: textDiffColor };

    switch (true) {
      case key === 'limit' && original !== defaultParams.limit:
      case key === 'mine_types' && original !== defaultParams.mine_types:
      case key === 'size' && original !== defaultParams.size:
      case key === 'has_breeds' && original !== defaultParams.has_breeds:
        return textDiffStyleObject;
      default:
        return {};
    }
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setModalVisible(true);
          setModalContent(item);
        }}
      />
    );
  };

  const handleReset = () => {
    setNewSettings(defaultParams);
  };

  const handleSave = () => {
    updateSettings(newSettings);
    router.back();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleModalConfirm = (data: ItemData) => {
    const { key, original } = data;
    if (key === 'limit') {
      setNewSettings((prev) => ({
        ...prev,
        limit: original,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <VotingSettingsModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        content={modalContent}
        onConfirm={handleModalConfirm}
      />

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.bottomBtnGroup}>
        <TouchableOpacity onPress={handleReset}>
          <Text>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave}>
          <Text>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  settingItem: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 0.5,
    gap: 10,
  },
  itemTitle: {
    flex: 1,
  },
  bottomBtnGroup: {
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
