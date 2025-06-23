import { request_getBreedsList } from '@/src/api';
import Empty from '@/src/components/Empty';
import Loading from '@/src/components/Loading';
import { colorMap } from '@/src/config';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ErrorContainer from '@/src/components/ErrorContainer';

export default function List() {
  const { id } = useLocalSearchParams();
  const inputRef = useRef<TextInput>(null);
  const [breedsList, setBreedList] = useState<{ [key: string]: any }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<{
    status: boolean;
    text: string;
  }>({ status: false, text: '' });
  const [terms, setTerms] = useState<string>('');
  const filterList = breedsList.filter((item) => isMatchTerms(item.name));
  // const alphabetList = new Set(
  //   breedsList.map((item) => (item.name as string).split('')[0])
  // );

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

  function handleToBreedInfo(selectedID: string) {
    if (selectedID === id) {
      router.back();
    } else {
      router.replace({
        pathname: '/Breeds',
        params: {
          id: selectedID,
        },
      });
    }
  }

  function handleOnChange(text: string) {
    setTerms(text);
  }

  function isMatchTerms(name: string) {
    if (!terms || name.toLowerCase().indexOf(terms.toLowerCase()) !== -1)
      return true;

    return false;
  }

  function handleFocus() {
    inputRef.current?.focus();
  }

  function handleReset() {
    setTerms('');
  }

  useEffect(() => {
    getBreedsList();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError.status) {
    return (
      <ErrorContainer
        errorText={isError.text}
        handleRetry={() => getBreedsList()}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={handleFocus}
          style={[styles.inputIcon, { left: 30 }]}
        >
          <MaterialIcons name="search" size={22} color="black" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          onChangeText={handleOnChange}
          value={terms}
          placeholder=""
          ref={inputRef}
        />

        {!!terms && (
          <TouchableOpacity
            onPress={handleReset}
            style={[styles.inputIcon, { right: 30 }]}
          >
            <MaterialIcons name="highlight-remove" size={20} color="#858585" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filterList}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        ListEmptyComponent={
          <View style={{ marginTop: 100 }}>
            <Empty />
          </View>
        }
        ItemSeparatorComponent={() => (
          <View style={styles.ItemSeparator}></View>
        )}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.breedItem,
                {
                  backgroundColor:
                    item.id === id ? colorMap['primary'] : 'white',
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
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  inputIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  input: {
    paddingLeft: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  breedItem: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  ItemSeparator: { backgroundColor: '#e2e2e2', height: 1 },
});
