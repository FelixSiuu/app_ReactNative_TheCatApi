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
import Button from '@/src/components/Button';
import Stars from '@/src/components/Stars';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';

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

export default function Breeds() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<SelectedState>({});
  const [img, setImg] = useState<ImgState>({
    width: 0,
    height: 0,
    url: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<{
    status: boolean;
    text: string;
  }>({ status: false, text: '' });
  const dataArray = [
    selected.indoor !== undefined && {
      label: 'Indoor',
      value: selected.indoor,
    },
    selected.lap !== undefined && {
      label: 'Lap',
      value: selected.lap,
    },
    selected.adaptability !== undefined && {
      label: 'Adaptability',
      value: selected.adaptability,
    },
    selected.affection_level !== undefined && {
      label: 'Affection Level',
      value: selected.affection_level,
    },
    selected.child_friendly !== undefined && {
      label: 'Child Friendly',
      value: selected.child_friendly,
    },
    selected.dog_friendly !== undefined && {
      label: 'Dog Friendly',
      value: selected.dog_friendly,
    },
    selected.energy_level !== undefined && {
      label: 'Energy Level',
      value: selected.energy_level,
    },
    selected.grooming !== undefined && {
      label: 'Grooming',
      value: selected.grooming,
    },
    selected.health_issues !== undefined && {
      label: 'Health Issues',
      value: selected.health_issues,
    },
    selected.intelligence !== undefined && {
      label: 'Intelligence',
      value: selected.intelligence,
    },
    selected.shedding_level !== undefined && {
      label: 'Shedding Level',
      value: selected.shedding_level,
    },
    selected.social_needs !== undefined && {
      label: 'Social Needs',
      value: selected.social_needs,
    },
    selected.stranger_friendly !== undefined && {
      label: 'Stranger Friendly',
      value: selected.stranger_friendly,
    },
    selected.vocalisation !== undefined && {
      label: 'Vocalisation',
      value: selected.vocalisation,
    },
    selected.experimental !== undefined && {
      label: 'Experimental',
      value: selected.experimental,
    },
    selected.hairless !== undefined && {
      label: 'Hairless',
      value: selected.hairless,
    },
    selected.natural !== undefined && {
      label: 'Natural',
      value: selected.natural,
    },
    selected.rare !== undefined && {
      label: 'Rare',
      value: selected.rare,
    },
    selected.rex !== undefined && {
      label: 'Rex',
      value: selected.rex,
    },
    selected.suppressed_tail !== undefined && {
      label: 'Suppressed Tail',
      value: selected.suppressed_tail,
    },
    selected.short_legs !== undefined && {
      label: 'Short Legs',
      value: selected.short_legs,
    },
    selected.hypoallergenic !== undefined && {
      label: 'Hypoallergenic',
      value: selected.hypoallergenic,
    },
  ];

  async function getBreedsInfo(params: BreedsParams) {
    setIsLoading(true);
    setIsError({
      status: false,
      text: '',
    });
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
      console.error(error.message);
      setIsError({
        status: true,
        text: error.message,
      });
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
    if (!id) {
      getBreedsInfo({
        ...fixedParams,
        has_breeds: 'true',
      });
    } else {
      getBreedsInfo({
        ...fixedParams,
        breed_id: id as string,
      });
    }
  }, [id]);

  function handleToBreedsList() {
    router.push({
      pathname: '/Breeds/List',
      params: {
        id: selected.id,
      },
    });
  }

  if (isError.status) {
    return (
      <View style={[styles.loadingAndErrorContainer, { gap: 20 }]}>
        <Text>{isError.text}</Text>
        <Button
          label="Retry"
          type="retry"
          onPress={() =>
            getBreedsInfo({
              ...fixedParams,
              has_breeds: 'true',
            })
          }
          disabled={isLoading}
          customStyle={{
            backgroundColor: colorMap['retry'],
          }}
        />
      </View>
    );
  }

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
      <TouchableHighlight onPress={handleToBreedsList}>
        <View style={styles.toBreedsList}>
          <Text style={styles.toBreedsListText}>{selected?.name}</Text>
          <FontAwesome name="caret-down" size={16} color="black" />
        </View>
      </TouchableHighlight>

      <View style={styles.imgContainer}>
        {isLoading ? (
          <View
            style={{ width: '100%', marginVertical: 100, alignItems: 'center' }}
          >
            <Loading />
          </View>
        ) : (
          <Image
            source={img.url}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: img.width / img.height,
            }}
          />
        )}

        <TouchableOpacity
          style={styles.rotateButton}
          onPress={handleGetImageAgain}
          disabled={isLoading}
        >
          <FontAwesome6 name="rotate" size={16} color={colorMap['retry']} />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          {selected?.name}
        </Text>
        {!selected?.alt_names ? null : (
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ( {selected?.alt_names} )
          </Text>
        )}

        <Text>Origin: {selected?.origin}</Text>

        <Text style={{ textAlign: 'center' }}>
          Temperament: {selected?.temperament}
        </Text>

        <Text style={{ textAlign: 'justify', color: '#808080', fontSize: 12 }}>
          {selected?.description}
        </Text>

        <Text style={{ textAlign: 'center', fontSize: 12 }}>
          {selected?.weight?.metric} kg / {selected?.weight?.imperial} oz
        </Text>

        <Text style={{ textAlign: 'center', fontSize: 12 }}>
          {selected?.life_span} average life span
        </Text>

        <View style={styles.infoBottomBorder}></View>
      </View>

      {dataArray.map((item, index) => {
        if (!item) return;
        return (
          <View key={index} style={styles.dataItem}>
            <Text>{item.label}</Text>
            <Stars value={item.value} />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingAndErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
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
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  rotateButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderRadius: '50%',
    borderWidth: 1,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
  },
  info: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  infoBottomBorder: {
    marginTop: 10,
    width: '100%',
    height: 5,
    backgroundColor: '#f2f2f2',
  },
  dataItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toWiki: {
    marginVertical: 30,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorMap['primary'],
    borderRadius: 5,
  },
});
