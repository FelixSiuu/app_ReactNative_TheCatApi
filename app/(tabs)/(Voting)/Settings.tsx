import { useSettings } from '@/src/context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import VotingSettingsModal from '@/src/components/VotingSettingsModal';
import { VotingSettingsType } from '@/src/config';
import { useRouter } from 'expo-router';

type ItemData = {
  key: string;
  title: string;
  value: string | number;
  original: unknown;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
};

type ModalState = {
  visible: boolean;
  content: ItemData;
};

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
        ? newSettings.mine_types.join(',')
        : 'all ( static, gif )',
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
        newSettings.has_breeds === undefined
          ? 'random'
          : newSettings.has_breeds === true
          ? 'yes'
          : 'no',
      original: newSettings.has_breeds,
    },
  ];
  const [modal, setModal] = useState<ModalState>({
    visible: false,
    content: DATA[0],
  });

  const Item = ({ onPress, item }: ItemProps) => {
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.settingItem}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text>{item.value}</Text>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </View>
      </TouchableHighlight>
    );
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          setModal({
            visible: true,
            content: item,
          })
        }
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
    setModal((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  return (
    <View style={styles.container}>
      <VotingSettingsModal
        isVisible={modal.visible}
        onClose={handleCloseModal}
        content={modal.content}
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
