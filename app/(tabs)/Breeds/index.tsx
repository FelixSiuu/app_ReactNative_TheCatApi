import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { request_getBreedInfo } from '@/src/api';
import Loading from '@/src/components/Loading';
import { BreedsParams } from '@/src/types';
import { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image } from 'expo-image';
import { colorMap } from '@/src/config';

const fixedParams = {
  mime_types: 'jpg,png',
  limit: 1,
};

type SelectedState = { [key: string]: any };

type ImgState = {
  height: number;
  width: number;
  url: string;
};

// const [breedsList, setBreedList] = useState<{ [key: string]: any }[]>([]);

// async function getBreedsList() {
//   try {
//     const result = await request_getBreedsList();

//     if (!Array.isArray(result)) {
//       throw new Error(result.message || 'Error!');
//     }

//     setBreedList(result);
//   } catch (error: any) {
//     console.error(error);
//   }
// }

export default function Breeds() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<SelectedState>({});
  const [img, setImg] = useState<ImgState>({
    width: 0,
    height: 0,
    url: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getBreedsInfo(params: BreedsParams) {
    setIsLoading(true);
    try {
      const result = await request_getBreedInfo(params);

      if (!Array.isArray(result)) {
        throw new Error(result.message || 'Error!');
      }

      setSelected(result[0].breeds[0]);
      setImg({
        width: result[0].width,
        height: result[0].height,
        url: result[0].url,
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleGetImageAgain() {
    getBreedsInfo({
      ...fixedParams,
      breed_id: selected.id,
    });
  }

  useEffect(() => {
    getBreedsInfo({
      ...fixedParams,
      has_breeds: 'true',
    });
  }, []);

  // getBreedsInfo({
  //   ...fixedParams,
  //   breed_id: selected.id,
  // });

  return (
    <ScrollView
      style={[
        {
          paddingTop: insets.top + 30,
          paddingBottom: insets.bottom + 30,
          paddingHorizontal: 20,
        },
        styles.container,
      ]}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <>
          <TouchableHighlight onPress={() => {}}>
            <View style={styles.toBreedsList}>
              <Text style={styles.toBreedsListText}>{selected.name}</Text>
              <FontAwesome name="caret-down" size={16} color="black" />
            </View>
          </TouchableHighlight>

          <View style={styles.imgContainer}>
            <Image
              source={img.url}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: img.width / img.height,
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.rotateButton}
            onPress={handleGetImageAgain}
          >
            <FontAwesome6 name="rotate" size={20} color={colorMap['retry']} />
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  loadingContainer: {
    marginVertical: '50%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toBreedsList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    gap: 20,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
  },
  toBreedsListText: {
    fontSize: 16,
    fontWeight: 500,
  },
  imgContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 30,
  },
  rotateButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderRadius: '50%',
    borderWidth: 1,
    marginHorizontal: 'auto',
    marginVertical: 30,
  },
});
