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
import {
  LimitSettingsModal,
  MimeTypesSettingsModal,
  SizeSettingsModal,
} from '@/src/components/VotingSettingsModal';
import { colorMap, VotingSettingsType } from '@/src/config';
import { useRouter } from 'expo-router';

type ItemData = {
  key: string;
  title: string;
  label: string | number;
  original: any;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
};

export type FlatItemType = ItemData;

export default function Settings() {
  const router = useRouter();
  const { settings: defaultParams, updateSettings } = useSettings();
  const [newSettings, setNewSettings] = useState<VotingSettingsType>({
    limit: defaultParams.limit,
    mime_types: defaultParams.mime_types,
    size: defaultParams.size,
    has_breeds: defaultParams.has_breeds,
  });
  const [limitModalVisible, setLmitModalVisible] = useState<boolean>(false);
  const [mimeTypesModalVisible, setmimeTypesModalVisible] =
    useState<boolean>(false);
  const [sizeModalVisible, setSizeModalVisible] = useState<boolean>(false);

  const DATA: ItemData[] = [
    {
      key: 'limit',
      title: 'Number of images to get each time :',
      label: newSettings.limit,
      original: newSettings.limit,
    },
    {
      key: 'mime_types',
      title: 'Images type :',
      label: newSettings.mime_types ? newSettings.mime_types : 'not specified',
      original: newSettings.mime_types,
    },
    {
      key: 'size',
      title: 'Images size :',
      label: newSettings.size
        ? newSettings.size
        : 'all ( thumb, small, med, full )',
      original: newSettings.size,
    },
    {
      key: 'has_breeds',
      title: 'Has breeds data :',
      label:
        newSettings.has_breeds === ''
          ? 'random'
          : newSettings.has_breeds === true
          ? 'yes'
          : 'no',
      original: newSettings.has_breeds,
    },
  ];

  const Item = ({ onPress, item }: ItemProps) => {
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.settingItem}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={[calcTextStyles(item)]}>{item.label}</Text>
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
      case key === 'mime_types' && original !== defaultParams.mime_types:
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
          if (item.key === 'limit') setLmitModalVisible(true);
          if (item.key === 'mime_types') setmimeTypesModalVisible(true);
          if (item.key === 'size') setSizeModalVisible(true);
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

  const handleSubmit = (data: ItemData) => {
    const { key, original } = data;

    if (key === 'limit') {
      setNewSettings((prev) => ({
        ...prev,
        limit: original,
      }));
      return;
    }

    if (key === 'mime_types') {
      setNewSettings((prev) => ({
        ...prev,
        mime_types: original,
      }));
      return;
    }

    if (key === 'size') {
      setNewSettings((prev) => ({
        ...prev,
        size: original,
      }));
      return;
    }
  };

  return (
    <View style={styles.container}>
      {limitModalVisible && (
        <LimitSettingsModal
          onClose={() => setLmitModalVisible(false)}
          content={DATA.find((item) => item.key === 'limit') as ItemData}
          onSubmit={handleSubmit}
        />
      )}

      {mimeTypesModalVisible && (
        <MimeTypesSettingsModal
          onClose={() => setmimeTypesModalVisible(false)}
          content={DATA.find((item) => item.key === 'mime_types') as ItemData}
          onSubmit={handleSubmit}
        />
      )}

      {sizeModalVisible && (
        <SizeSettingsModal
          onClose={() => {
            setSizeModalVisible(false);
          }}
          content={DATA.find((item) => item.key === 'size') as ItemData}
          onSubmit={handleSubmit}
        />
      )}

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
