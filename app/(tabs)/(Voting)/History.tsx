import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { request_getVoteHistory } from '@/src/api';
import { useEffect, useState } from 'react';
import Loading from '@/src/components/Loading';
import ErrorContainer from '@/src/components/ErrorContainer';
import { Image, ImageSource } from 'expo-image';
import Empty from '@/src/components/Empty';
import HistoryModal from '@/src/components/HistoryModal';
import { colorMap, subId } from '@/src/config';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export type ListItem = {
  id: number;
  image_id: string;
  sub_id: string;
  created_at: string;
  value: 0 | 1;
  country_code: string;
  image: {
    id: string;
    url: ImageSource;
  };
};

export default function History() {
  const [list, setList] = useState<ListItem[]>([]);
  const [selected, setSelected] = useState<ListItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isError, setIsError] = useState<{
    status: boolean;
    text: string;
  }>({ status: false, text: '' });

  async function getVoteHistory() {
    setIsLoading(true);
    setIsError({
      status: false,
      text: '',
    });

    try {
      const result = await request_getVoteHistory({
        limit: '10',
        order: 'DESC',
      });

      if (!Array.isArray(result)) {
        throw new Error(result.message || 'Error!');
      }

      setList(result);
    } catch (error: any) {
      console.error(error);
      setIsError({
        status: true,
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getVoteHistory();
  }, []);

  function handleOpenModal(item: ListItem) {
    setSelected(item);
    setIsModalVisible(true);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError.status) {
    return (
      <ErrorContainer
        errorText={isError.text}
        handleRetry={() => getVoteHistory()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        numColumns={2}
        ListEmptyComponent={<Empty />}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            style={styles.item}
            onPress={() => handleOpenModal(item)}
          >
            <Image
              source={item.image.url}
              style={{
                width: '100%',
                height: '100%',
              }}
              contentFit={'cover'}
            />

            <View
              style={[
                styles.iconContainer,
                {
                  transform: [
                    {
                      rotate: item.value === 1 ? '-10deg' : '10deg',
                    },
                  ],
                },
              ]}
            >
              <FontAwesome
                name={item.value === 1 ? 'thumbs-up' : 'thumbs-down'}
                size={24}
                color={
                  item.value === 1 ? colorMap['vote-up'] : colorMap['vote-down']
                }
              />
            </View>
          </Pressable>
        )}
      />

      {isModalVisible && !!selected && (
        <HistoryModal
          onClose={() => setIsModalVisible(false)}
          value={selected.value}
          image={selected.image}
          id={selected.id}
          image_id={selected.image_id}
          sub_id={subId}
          created_at={selected.created_at}
          country_code={selected.country_code}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  rowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: { flex: 1, aspectRatio: '1', position: 'relative' },
  iconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 10,
  },
});
