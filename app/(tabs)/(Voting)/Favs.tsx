import { request_getFavsList } from '@/src/api';
import { Empty, ErrorContainer, Loading } from '@/src/components';
import { subId } from '@/src/config';
import { ImageSource, Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';

export type ListItem = {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: {
    id: string;
    url: ImageSource;
  };
};

export default function Favs() {
  const [list, setList] = useState<ListItem[]>([]);
  const [selected, setSelected] = useState<ListItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isError, setIsError] = useState<{
    status: boolean;
    text: string;
  }>({ status: false, text: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function getFavsList() {
    setIsLoading(true);
    setIsError({
      status: false,
      text: '',
    });

    try {
      const result = await request_getFavsList({
        sub_id: subId,
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
    getFavsList();
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
        handleRetry={() => getFavsList()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
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
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  rowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flex: 1,
    aspectRatio: '1',
    position: 'relative',
    marginBottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 10,
  },
});
