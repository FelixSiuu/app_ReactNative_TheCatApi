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
import { useEffect, useState } from 'react';
import {
  LimitSettingsModal,
  MimeTypesSettingsModal,
  SizeSettingsModal,
  HasBreedsSettingsModal,
  CategorySettingsModal,
} from '@/src/components';
import { colorMap } from '@/src/config';
import { useRouter } from 'expo-router';
import {
  Limit,
  MimeTypes,
  HasBreeds,
  VotingSettingsType,
  Size,
  CategoriesId,
} from '@/src/types';
import { request_getCategoriesList } from '@/src/api';

export type ItemData = {
  key: string;
  title: string;
  label: string;
  original: any;
};

export type CategoryItem = {
  id: string;
  name: string;
};

export default function Settings() {
  const router = useRouter();
  const { settings: defaultParams, updateSettings } = useSettings();
  const [limit, setLimit] = useState<Limit>(defaultParams.limit);
  const [mimeTypes, setMimeTypes] = useState<MimeTypes>(
    defaultParams.mime_types
  );
  const [hasBreeds, setHasBreeds] = useState<HasBreeds>(
    defaultParams.has_breeds
  );
  const [size, setSize] = useState<Size>(defaultParams.size);
  const [categoryId, setCategoryId] = useState<CategoriesId>(
    defaultParams.category_ids
  );
  const [categoryList, setCategoryList] = useState<CategoryItem[] | null>(null);
  const [limitModalVisible, setLmitModalVisible] = useState<boolean>(false);
  const [mimeTypesModalVisible, setmimeTypesModalVisible] =
    useState<boolean>(false);
  const [sizeModalVisible, setSizeModalVisible] = useState<boolean>(false);
  const [hasBreedsModalVisible, setHasBreedsModalVisible] =
    useState<boolean>(false);
  const [categoryModalVisible, setCategoryModalVisible] =
    useState<boolean>(false);

  async function getCategoryList() {
    try {
      const result = await request_getCategoriesList();

      if (!Array.isArray(result)) {
        throw new Error(result.message || 'Error!');
      }
      setCategoryList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  const DATA: ItemData[] = [
    {
      key: 'limit',
      title: 'Number of images to get each time :',
      label: limit,
      original: limit,
    },
    {
      key: 'mime_types',
      title: 'Images type :',
      label: mimeTypes ? mimeTypes : 'not specified',
      original: mimeTypes,
    },
    // {
    //   key: 'has_breeds',
    //   title: 'Has breeds data :',
    //   label: hasBreeds === '' ? 'random' : hasBreeds === 'true' ? 'yes' : 'no',
    //   original: hasBreeds,
    // },
    {
      key: 'size',
      title: 'Images size :',
      label: size ? size : 'all ( thumb, small, med, full )',
      original: size,
    },
    {
      key: 'category_ids',
      title: 'Category :',
      label: categoryId
        ? categoryList?.find((item) => item.id === categoryId)?.name ?? ''
        : 'not specified',
      original: categoryId,
    },
  ];

  const Item = ({ onPress, item }: { onPress: () => void; item: ItemData }) => {
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
      case key === 'category_ids' && original !== defaultParams.category_ids:
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
          if (item.key === 'has_breeds') setHasBreedsModalVisible(true);
          if (item.key === 'category_ids') setCategoryModalVisible(true);
        }}
      />
    );
  };

  const handleReset = () => {
    setLimit(defaultParams.limit);
    setMimeTypes(defaultParams.mime_types);
    setHasBreeds(defaultParams.has_breeds);
    setSize(defaultParams.size);
    setCategoryId(defaultParams.category_ids);
  };

  const handleSave = () => {
    if (
      limit !== defaultParams.limit ||
      mimeTypes !== defaultParams.mime_types ||
      hasBreeds !== defaultParams.has_breeds ||
      size !== defaultParams.size ||
      categoryId !== defaultParams.category_ids
    ) {
      const newSettings: VotingSettingsType = {
        limit: limit,
        mime_types: mimeTypes,
        has_breeds: hasBreeds,
        size: size,
        category_ids: categoryId,
      };
      updateSettings(newSettings);
    }

    router.back();
  };

  return (
    <View style={styles.container}>
      {limitModalVisible && (
        <LimitSettingsModal
          onClose={() => setLmitModalVisible(false)}
          content={DATA.find((item) => item.key === 'limit') as ItemData}
          onSubmit={(data: ItemData) => setLimit(data.original)}
        />
      )}

      {mimeTypesModalVisible && (
        <MimeTypesSettingsModal
          onClose={() => setmimeTypesModalVisible(false)}
          content={DATA.find((item) => item.key === 'mime_types') as ItemData}
          onSubmit={(data: ItemData) => setMimeTypes(data.original)}
        />
      )}

      {hasBreedsModalVisible && (
        <HasBreedsSettingsModal
          onClose={() => setHasBreedsModalVisible(false)}
          content={DATA.find((item) => item.key === 'has_breeds') as ItemData}
          onSubmit={(data: ItemData) => setHasBreeds(data.original)}
        />
      )}

      {sizeModalVisible && (
        <SizeSettingsModal
          onClose={() => setSizeModalVisible(false)}
          content={DATA.find((item) => item.key === 'size') as ItemData}
          onSubmit={(data: ItemData) => setSize(data.original)}
        />
      )}

      {categoryModalVisible && categoryList && (
        <CategorySettingsModal
          onClose={() => setCategoryModalVisible(false)}
          content={DATA.find((item) => item.key === 'category_ids') as ItemData}
          onSubmit={(data: ItemData) => setCategoryId(data.original)}
          list={categoryList}
        />
      )}

      <FlatList data={DATA} renderItem={renderItem} />

      {limit !== defaultParams.limit ||
      mimeTypes !== defaultParams.mime_types ||
      hasBreeds !== defaultParams.has_breeds ||
      size !== defaultParams.size ? (
        <Text style={styles.warning}>
          Click the &quot;Apply Settings&quot; button to apply the settings
        </Text>
      ) : null}

      <View style={styles.bottomBtnGroup}>
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.button, styles.buttonReset]}
        >
          <Text>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          style={[styles.button, styles.buttonSubmit]}
        >
          <Text style={[styles.buttonSubmitText]}>Apply Settings</Text>
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
  warning: {
    marginTop: 20,
    textAlign: 'center',
    color: colorMap['settings-textDiffColor'],
  },
  bottomBtnGroup: {
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 80,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonReset: {
    backgroundColor: '#cccccc',
  },
  buttonSubmit: {
    backgroundColor: colorMap['settings-primaryColor'],
  },
  buttonSubmitText: {
    color: 'white',
  },
});
