import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { request_getVoteHistory } from '@/src/api';
import { useEffect, useState } from 'react';
import Loading from '@/src/components/Loading';
import ErrorContainer from '@/src/components/ErrorContainer';

export default function History() {
  const [list, setList] = useState<{ [key: string]: any }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.rowContainer}>
          {list.map((item) => (
            <View key={item.id} style={{ width: '48%' }}>
              <Text>{item.id}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  rowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
