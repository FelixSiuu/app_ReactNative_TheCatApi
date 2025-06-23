import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextStyle,
} from 'react-native';
import { ItemData, CategoryItem } from '@/app/(tabs)/(Voting)/Settings';
import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { colorMap, getImagesLimit } from '../config';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  onClose: () => void;
  content: ItemData;
  onSubmit: (data: ItemData) => void;
};

type OptionState = {
  label: string;
  value: string;
};

type CategorySettingsProps = Props & {
  list: CategoryItem[];
};

export function LimitSettingsModal({ onClose, content, onSubmit }: Props) {
  const [data, setData] = useState<ItemData>(content);

  function handleSliderChange(count: number) {
    setData((prev) => ({
      ...prev,
      original: String(count),
      label: String(count),
    }));
  }

  return (
    <Modal
      animationType="none"
      visible={true}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.TopBtnGroup}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onClose();
                onSubmit(data);
              }}
              style={[styles.button, styles.buttonSubmit]}
            >
              <Text style={styles.buttonSubmitText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <Text>{data.title}</Text>

            <Text>{data.label}</Text>
          </View>

          <Slider
            step={1}
            style={{ width: '100%', height: 40 }}
            minimumValue={getImagesLimit.min}
            maximumValue={getImagesLimit.max}
            minimumTrackTintColor={colorMap['slider-minimumTrackTintColor']}
            maximumTrackTintColor={colorMap['slider-maximumTrackTintColor']}
            value={Number(data.original)}
            onValueChange={handleSliderChange}
          />
        </View>
      </View>
    </Modal>
  );
}

export function MimeTypesSettingsModal({ onClose, content, onSubmit }: Props) {
  const allImageTypesArray = ['jpg', 'png', 'gif'];
  const [data, setData] = useState<ItemData>(content);
  const [selectedArray, setSelectedArray] = useState<string[]>(
    !content.original ? [] : content.original.split(',')
  );

  const handleCheckBoxChange = (selected: string) => {
    setData((prev) => ({
      ...prev,
      original: selected,
      label: !selected ? 'not specified' : selected,
    }));
  };

  const checkBoxChange = (selected: string) => {
    let newArr = selectedArray;

    if (newArr.includes(selected)) {
      newArr = newArr.filter((item) => item !== selected);
    } else {
      newArr = [...newArr, selected];
    }

    setSelectedArray(newArr);
    handleCheckBoxChange(newArr.join(','));
  };

  const calcBtnTextStyles = (selected: string): TextStyle => {
    if (selectedArray.includes(selected)) {
      return {
        color: colorMap['settings-primaryColor'],
      };
    }
    return {};
  };

  return (
    <Modal
      animationType="none"
      visible={true}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.TopBtnGroup}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onClose();
                onSubmit(data);
              }}
              style={[styles.button, styles.buttonSubmit]}
            >
              <Text style={styles.buttonSubmitText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <Text>{data.title}</Text>

            <Text>{data.label}</Text>
          </View>

          <View
            style={{
              gap: 10,
              marginHorizontal: 30,
              alignItems: 'flex-start',
            }}
          >
            {allImageTypesArray.map((item) => (
              <Pressable
                style={[
                  {
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomColor: '#e2e2e2',
                    borderBottomWidth: 0.5,
                    paddingVertical: 10,
                  },
                ]}
                key={item}
                onPress={() => checkBoxChange(item)}
              >
                {selectedArray.includes(item) ? (
                  <Ionicons
                    name="checkbox"
                    size={20}
                    color={colorMap['settings-primaryColor']}
                  />
                ) : (
                  <Ionicons name="square-outline" size={20} />
                )}

                <Text style={[{ fontSize: 14 }, calcBtnTextStyles(item)]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function SizeSettingsModal({ onClose, content, onSubmit }: Props) {
  const allSizeArray: OptionState[] = [
    {
      label: 'all ( thumb, small, med, full )',
      value: '',
    },
    {
      label: 'thumb',
      value: 'thumb',
    },
    {
      label: 'small',
      value: 'small',
    },
    {
      label: 'med',
      value: 'med',
    },
    {
      label: 'full',
      value: 'full',
    },
  ];
  const [data, setData] = useState<ItemData>(content);
  const [selected, setSelected] = useState<OptionState>({
    label: content.label,
    value: content.original,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      original: selected.value,
      label: !selected.value
        ? 'all ( thumb, small, med, full )'
        : selected.value,
    }));
  }, [selected]);

  function handleOptionChange(option: OptionState) {
    setSelected(option);
  }

  const calcBtnTextStyles = (option: OptionState): TextStyle => {
    if (selected.value === option.value) {
      return {
        color: colorMap['settings-primaryColor'],
      };
    }
    return {};
  };

  return (
    <Modal
      animationType="none"
      visible={true}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.TopBtnGroup}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onClose();
                onSubmit(data);
              }}
              style={[styles.button, styles.buttonSubmit]}
            >
              <Text style={styles.buttonSubmitText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <Text>{data.title}</Text>

            <Text>{data.label}</Text>
          </View>

          <View
            style={{
              gap: 10,
              marginHorizontal: 30,
              alignItems: 'flex-start',
            }}
          >
            {allSizeArray.map((item) => (
              <Pressable
                style={[
                  {
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomColor: '#e2e2e2',
                    borderBottomWidth: 0.5,
                    paddingVertical: 10,
                  },
                ]}
                key={item.value}
                onPress={() => handleOptionChange(item)}
              >
                {selected.value === item.value ? (
                  <Ionicons
                    name="radio-button-on"
                    size={20}
                    color={colorMap['settings-primaryColor']}
                  />
                ) : (
                  <Ionicons name="radio-button-off" size={20} />
                )}

                <Text style={[{ fontSize: 14 }, calcBtnTextStyles(item)]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function HasBreedsSettingsModal({ onClose, content, onSubmit }: Props) {
  const allHasBreedsOptionArray: OptionState[] = [
    {
      label: 'random',
      value: '',
    },
    {
      label: 'yes',
      value: 'true',
    },
    {
      label: 'no',
      value: 'false',
    },
  ];
  const [data, setData] = useState<ItemData>(content);
  const [selected, setSelected] = useState<OptionState>({
    label: content.label,
    value: content.original,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      original: selected.value,
      label: !selected.value
        ? 'random'
        : selected.value === 'true'
        ? 'yes'
        : 'no',
    }));
  }, [selected]);

  function handleOptionChange(option: OptionState) {
    setSelected(option);
  }

  const calcBtnTextStyles = (option: OptionState): TextStyle => {
    if (selected.value === option.value) {
      return {
        color: colorMap['settings-primaryColor'],
      };
    }
    return {};
  };

  return (
    <Modal
      animationType="none"
      visible={true}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.TopBtnGroup}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onClose();
                onSubmit(data);
              }}
              style={[styles.button, styles.buttonSubmit]}
            >
              <Text style={styles.buttonSubmitText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <Text>{data.title}</Text>

            <Text>{data.label}</Text>
          </View>

          <View
            style={{
              gap: 10,
              marginHorizontal: 30,
              alignItems: 'flex-start',
            }}
          >
            {allHasBreedsOptionArray.map((item) => (
              <Pressable
                style={[
                  {
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomColor: '#e2e2e2',
                    borderBottomWidth: 0.5,
                    paddingVertical: 10,
                  },
                ]}
                key={item.value}
                onPress={() => handleOptionChange(item)}
              >
                {selected.value === item.value ? (
                  <Ionicons
                    name="radio-button-on"
                    size={20}
                    color={colorMap['settings-primaryColor']}
                  />
                ) : (
                  <Ionicons name="radio-button-off" size={20} />
                )}

                <Text style={[{ fontSize: 14 }, calcBtnTextStyles(item)]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function CategorySettingsModal({
  onClose,
  content,
  onSubmit,
  list,
}: CategorySettingsProps) {
  const allCategoryOptionList = [
    {
      id: '',
      name: 'not specified',
    },
    ...list,
  ];
  const [data, setData] = useState<ItemData>(content);
  const [selected, setSelected] = useState<CategoryItem>({
    id: content.original,
    name: content.label,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      original: selected.id,
      label: selected.name,
    }));
  }, [selected]);

  function handleOptionChange(option: CategoryItem) {
    setSelected(option);
  }

  const calcBtnTextStyles = (option: CategoryItem): TextStyle => {
    if (selected.id === option.id) {
      return {
        color: colorMap['settings-primaryColor'],
      };
    }
    return {};
  };

  return (
    <Modal
      animationType="none"
      visible={true}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.TopBtnGroup}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onClose();
                onSubmit(data);
              }}
              style={[styles.button, styles.buttonSubmit]}
            >
              <Text style={styles.buttonSubmitText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <Text>{data.title}</Text>

            <Text>{data.label}</Text>
          </View>

          <View
            style={{
              gap: 10,
              marginHorizontal: 30,
              alignItems: 'flex-start',
            }}
          >
            {allCategoryOptionList.map((item) => (
              <Pressable
                style={[
                  {
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomColor: '#e2e2e2',
                    borderBottomWidth: 0.5,
                    paddingVertical: 10,
                  },
                ]}
                key={item.id}
                onPress={() => handleOptionChange(item)}
              >
                {selected.id === item.id ? (
                  <Ionicons
                    name="radio-button-on"
                    size={20}
                    color={colorMap['settings-primaryColor']}
                  />
                ) : (
                  <Ionicons name="radio-button-off" size={20} />
                )}

                <Text style={[{ fontSize: 14 }, calcBtnTextStyles(item)]}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </View>
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
  button: {
    width: 80,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: '#cccccc',
  },
  buttonSubmit: {
    backgroundColor: colorMap['settings-primaryColor'],
  },
  buttonSubmitText: {
    color: 'white',
  },
  contentWrapper: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
