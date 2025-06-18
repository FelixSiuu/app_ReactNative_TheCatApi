import {
  request_deleteFav,
  request_getImg,
  request_saveFav,
  request_vote,
} from '@/src/api';
import Button from '@/src/components/Button';
import VotingImageCard from '@/src/components/VotingImageCard';
import { colorMap, pendingVotingPosition, subId } from '@/src/config';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const loadingGif = require('@/assets/images/loading.gif');

type ImgState = {
  height: number;
  width: number;
  url: string;
  breeds: { [key: string]: any }[];
  id: string;
};

type VotedImgState = {
  id: string;
  voteResult: 1 | 0;
};

export type settingsType = {
  limit: number;
  mine_types?: 'jpg' | 'png' | 'gif';
  has_breeds?: boolean;
  size?: 'thumb' | 'small' | 'med' | 'full';
};

export default function Voting() {
  const [imgs, setImgs] = useState<ImgState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [votedImg, setVotedImg] = useState<VotedImgState | null>(null);
  const [isVotingError, setIsVotingError] = useState<boolean>(false);
  const [isLoadImgError, setIsLoadImgError] = useState<boolean>(false);
  const [isHighLightVoteDown, setIsHighLightVoteDown] =
    useState<boolean>(false);
  const [isHighLightVoteUp, setIsHighLightVoteUp] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [favid, setFavId] = useState<string | null>(null);
  const [getImgSettings, setGetImgSettings] = useState<settingsType>({
    limit: 5,
  });
  const router = useRouter();

  useEffect(() => {
    setIsHighLightVoteDown(false);
    setIsHighLightVoteUp(false);
    setIsFav(false);

    if (imgs.length === 0) getImg();
  }, [imgs]);

  async function getImg() {
    setIsLoading(true);
    setIsLoadImgError(false);
    try {
      const result = await request_getImg(getImgSettings);

      if (!result) {
        throw new Error(result.message || 'Error!');
      }

      setImgs(result);
    } catch (error) {
      console.error(error);
      setIsLoadImgError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function voteImg({ voteValue }: { voteValue: 1 | 0 }) {
    if (!imgs) return;

    const imgId = imgs[0].id;

    setVotedImg({
      id: imgId,
      voteResult: voteValue,
    });

    setIsVotingError(false);

    try {
      const result = await request_vote({
        image_id: imgId,
        sub_id: subId,
        value: voteValue,
      });

      if (result.message === 'SUCCESS') {
        const filterImg = imgs.filter((item) => item.id !== imgId);
        setImgs(filterImg);
      } else {
        throw new Error(result.message || 'Error !');
      }
    } catch (error) {
      setIsVotingError(true);
      console.error(error);
    } finally {
      setVotedImg(null);
    }
  }

  async function favImg() {
    setIsFav(true);

    const imgId = imgs[0].id;

    try {
      const result = await request_saveFav({
        sub_id: subId,
        image_id: imgId,
      });

      if (result.message === 'SUCCESS') {
        setFavId(result.id);
      } else {
        throw new Error(result.message || 'Error !');
      }
    } catch (error) {
      console.error(error);
      setIsFav(false);
    }
  }

  async function delFavImg() {
    if (!favid) return;
    setIsFav(false);
    try {
      const result = await request_deleteFav({ favourite_id: favid });
      if (result.message === 'SUCCESS') {
        setFavId(null);
      } else {
        throw new Error(result.message || 'Error !');
      }
    } catch (error) {
      console.error(error);
      setIsFav(true);
    }
  }

  function dragEventListener(position: {
    positionX: number;
    positionY: number;
  }) {
    const { positionX } = position;
    if (positionX <= pendingVotingPosition.left) {
      setIsHighLightVoteDown(true);
    } else {
      setIsHighLightVoteDown(false);
    }

    if (positionX >= pendingVotingPosition.right) {
      setIsHighLightVoteUp(true);
    } else {
      setIsHighLightVoteUp(false);
    }
  }

  function toSettings() {
    router.navigate({
      pathname: '/Settings',
      params: {
        limit: getImgSettings.limit,
        mine_types: getImgSettings.mine_types,
        has_breed: String(getImgSettings.has_breeds),
        size: getImgSettings.size,
      },
    });
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Image
          source={loadingGif}
          style={{
            width: 30,
            height: 30,
          }}
        />
      ) : isLoadImgError ? (
        <View style={styles.container}>
          <Button
            label="Retry"
            type="retry"
            onPress={() => getImg()}
            disabled={isLoading}
            customStyle={{
              backgroundColor: colorMap['retry'],
            }}
          />
        </View>
      ) : (
        <>
          {imgs.map((item, index) => {
            return (
              <VotingImageCard
                key={item.id}
                isError={isVotingError}
                order={imgs.length - index}
                imgId={item.id}
                imgSource={{
                  uri: item.url,
                }}
                votedImg={votedImg}
                handleVoteImg={(voteResult) =>
                  voteImg({ voteValue: voteResult })
                }
                dragEventListener={dragEventListener}
              />
            );
          })}
        </>
      )}
      <View style={styles.bottomBtnGroup}>
        <View
          style={[
            styles.buttonContainer,
            {
              justifyContent: 'flex-end',
            },
          ]}
        >
          <Pressable
            style={styles.otherButtonWrapper}
            onPress={() => toSettings()}
          >
            <AntDesign name="setting" size={26} color="black" />
          </Pressable>
          <Button
            label="NOPE IT"
            type="vote-down"
            onPress={() => voteImg({ voteValue: 0 })}
            disabled={isLoading}
            customStyle={{
              backgroundColor: isLoading
                ? colorMap['disabled']
                : isHighLightVoteDown
                ? colorMap['vote-down']
                : colorMap['votingBtnDisabled'],
            }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="LOVE IT"
            type="vote-up"
            onPress={() => voteImg({ voteValue: 1 })}
            disabled={isLoading}
            customStyle={{
              backgroundColor: isLoading
                ? colorMap['disabled']
                : isHighLightVoteUp
                ? colorMap['vote-up']
                : colorMap['votingBtnDisabled'],
            }}
          />
          <Pressable
            style={styles.otherButtonWrapper}
            onPress={() => {
              if (!isFav && !favid) {
                favImg();
              } else {
                delFavImg();
              }
            }}
          >
            {isFav ? (
              <AntDesign name="heart" size={20} color="#f70707" />
            ) : (
              <AntDesign name="hearto" size={20} color="black" />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomBtnGroup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '5%',
    zIndex: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5%',
  },
  otherButtonWrapper: {
    width: 35,
    height: 35,
    borderRadius: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
