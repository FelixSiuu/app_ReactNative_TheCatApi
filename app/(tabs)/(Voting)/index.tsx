import {
  request_deleteFav,
  request_getImg,
  request_saveFav,
  request_vote,
} from '@/src/api';
import { useRouter } from 'expo-router';
import { useSettings } from '@/src/context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colorMap, pendingVotingPosition, subId } from '@/src/config';
import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  ErrorContainer,
  Loading,
  VotingButton,
  VotingImageCard,
} from '@/src/components';

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

export default function Voting() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { settings: voteImgParams } = useSettings();
  const [imgs, setImgs] = useState<ImgState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [votedImg, setVotedImg] = useState<VotedImgState | null>(null);
  const [isVotingError, setIsVotingError] = useState<boolean>(false);
  const [isError, setIsError] = useState<{
    status: boolean;
    text: string;
  }>({ status: false, text: '' });
  const [isHighLightVoteDown, setIsHighLightVoteDown] =
    useState<boolean>(false);
  const [isHighLightVoteUp, setIsHighLightVoteUp] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [favid, setFavId] = useState<string | null>(null);

  async function getImg() {
    setIsLoading(true);
    setIsError({
      status: false,
      text: '',
    });
    try {
      const result = await request_getImg(voteImgParams);

      if (!Array.isArray(result)) {
        throw new Error(result.message || 'Error!');
      }

      setImgs(result);
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

  async function voteImg({ voteValue }: { voteValue: 1 | 0 }) {
    setIsSubmitting(true);
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
      setIsSubmitting(false);
      setVotedImg(null);
    }
  }

  async function favImg() {
    setIsFav(true);
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  }

  async function delFavImg() {
    if (!favid) return;
    setIsFav(false);
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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
    router.push({
      pathname: '/Settings',
    });
  }

  function toHistory() {
    router.push({
      pathname: '/History',
    });
  }

  useEffect(() => {
    setIsHighLightVoteDown(false);
    setIsHighLightVoteUp(false);
    setIsFav(false);

    if (imgs.length === 0 && !isLoading) getImg();
  }, [imgs]);

  useEffect(() => {
    getImg();
  }, [voteImgParams]);

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        styles.container,
      ]}
    >
      {isLoading ? (
        <Loading />
      ) : isError.status === true ? (
        <ErrorContainer handleRetry={() => getImg()} errorText={isError.text} />
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
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.otherButtonWrapper}
            onPress={() => toSettings()}
          >
            <FontAwesome name="gears" size={24} color={colorMap['settings']} />
          </TouchableHighlight>

          <VotingButton
            type="vote-down"
            onPress={() => voteImg({ voteValue: 0 })}
            disabled={isLoading || !imgs.length || isSubmitting}
            buttonBgColor={
              isLoading
                ? colorMap['disabled']
                : isHighLightVoteDown
                ? colorMap['vote-down']
                : colorMap['vote-disabled']
            }
            iconColor={isHighLightVoteDown ? 'white' : colorMap['vote-down']}
          />

          <TouchableHighlight
            style={styles.otherButtonWrapper}
            disabled={isLoading || !imgs.length || isSubmitting}
            onPress={() => {
              if (!isFav && !favid) {
                favImg();
              } else {
                delFavImg();
              }
            }}
          >
            <AntDesign
              name={isFav ? 'heart' : 'hearto'}
              size={20}
              color={colorMap['fav-active']}
            />
          </TouchableHighlight>

          <VotingButton
            type="vote-up"
            onPress={() => voteImg({ voteValue: 1 })}
            disabled={isLoading || !imgs.length || isSubmitting}
            buttonBgColor={
              isLoading
                ? colorMap['disabled']
                : isHighLightVoteUp
                ? colorMap['vote-up']
                : colorMap['vote-disabled']
            }
            iconColor={isHighLightVoteUp ? 'white' : colorMap['vote-up']}
          />

          <TouchableHighlight
            style={styles.otherButtonWrapper}
            disabled={isLoading || !imgs.length || isSubmitting}
            onPress={toHistory}
          >
            <FontAwesome5
              name="history"
              size={20}
              color={colorMap['history']}
            />
          </TouchableHighlight>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '3%',
    zIndex: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
