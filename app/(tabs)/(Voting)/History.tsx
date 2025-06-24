import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { request_getVoteHistory, request_vote } from '@/src/api';
import { colorMap, subId } from '@/src/config';
import { useEffect, useState } from 'react';
import { Image, ImageSource } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Empty, ErrorContainer, HistoryModal, Loading } from '@/src/components';

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  async function voteImg({
    voteValue,
    imgId,
  }: {
    voteValue: ListItem['value'];
    imgId: ListItem['image_id'];
  }) {
    setIsSubmitting(true);
    try {
      const result = await request_vote({
        image_id: imgId,
        sub_id: subId,
        value: voteValue,
      });

      if (result.message === 'SUCCESS') {
        setIsModalVisible(false);
        getVoteHistory();
      } else {
        throw new Error(result.message || 'Error !');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    getVoteHistory();
  }, []);

  function handleOpenModal(item: ListItem) {
    setSelected(item);
    setIsModalVisible(true);
  }

  function isThumbsUp(value: ListItem['value']) {
    return value === 1;
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
                      rotate: isThumbsUp(item.value) ? '-10deg' : '10deg',
                    },
                  ],
                },
              ]}
            >
              <FontAwesome
                name={isThumbsUp(item.value) ? 'thumbs-up' : 'thumbs-down'}
                size={24}
                color={
                  isThumbsUp(item.value)
                    ? colorMap['vote-up']
                    : colorMap['vote-down']
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
          isVoting={isSubmitting}
          handleVoteAgain={({ value, imgId }) =>
            voteImg({
              voteValue: value,
              imgId: imgId,
            })
          }
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
