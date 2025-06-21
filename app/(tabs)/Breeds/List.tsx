import { request_getBreedsList } from '@/src/api';
import Button from '@/src/components/Button';
import Loading from '@/src/components/Loading';
import { colorMap } from '@/src/config';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function List() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [breedsList, setBreedList] = useState<{ [key: string]: any }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<{
    status: boolean;
    text: string;
  }>({ status: false, text: '' });
  const [terms, setTerms] = useState<string>(
    breedsList?.find((item) => item.id === id)?.name || ''
  );
  const alphabetList = new Set(
    breedsList.map((item) => (item.name as string).split('')[0])
  );

  async function getBreedsList() {
    setIsLoading(true);
    setIsError({
      status: false,
      text: '',
    });
    try {
      const result = await request_getBreedsList();

      if (!Array.isArray(result)) {
        throw new Error(result.message || 'Error!');
      }

      setBreedList(result);
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

  function handleToBreedInfo(id: string) {
    router.replace({
      pathname: '/Breeds',
      params: {
        id: id,
      },
    });
  }

  function handleOnChange(text: string) {
    setTerms(text);
  }

  useEffect(() => {
    getBreedsList();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Loading />
      </View>
    );
  }

  if (isError.status) {
    return (
      <View style={[styles.loadingAndErrorContainer, { gap: 20 }]}>
        <Text>{isError.text}</Text>
        <Button
          label="Retry"
          type="retry"
          onPress={() => getBreedsList()}
          disabled={isLoading}
          customStyle={{
            backgroundColor: colorMap['retry'],
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 59,
      }}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleOnChange}
          value={terms}
          placeholder=""
        />
      </View>

      <ScrollView>
        {breedsList.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.breedItem,
              {
                backgroundColor: item.id === id ? colorMap['primary'] : 'white',
              },
            ]}
            onPress={() => handleToBreedInfo(item.id)}
          >
            <Text
              style={[
                {
                  fontWeight: item.id === id ? 600 : 400,
                  color: item.id === id ? 'white' : 'black',
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingAndErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  breedItem: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 0.5,
  },
});
