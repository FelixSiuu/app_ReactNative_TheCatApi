import { request_getImg, request_vote } from '@/src/api';
import Button from '@/src/components/Button';
import VotingImageCard from '@/src/components/VotingImageCard';
import { pendingVotingPosition, subId } from '@/src/config';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
const loadingGif = require('@/assets/images/loading.gif');

type ImgState = {
  height: number;
  width: number;
  url: string;
  breeds: { [key: string]: any }[];
  id: string;
}[];

type VotedImgState = {
  id: string;
  voteResult: 1 | 0;
};

export default function Voting() {
  const [img, setImg] = useState<ImgState>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [votedImg, setVotedImg] = useState<VotedImgState | null>(null);
  const [isVotingError, setIsVotingError] = useState<boolean>(false);
  const [isLoadImgError, setIsLoadImgError] = useState<boolean>(false);
  const [isHighLightVoteDown, setIsHighLightVoteDown] =
    useState<boolean>(false);
  const [isHighLightVoteUp, setIsHighLightVoteUp] = useState<boolean>(false);

  useEffect(() => {
    if (img.length === 0) getImg();
  }, [img]);

  useEffect(() => {
    setIsHighLightVoteDown(false);
    setIsHighLightVoteUp(false);
  }, [img]);

  async function getImg() {
    setIsLoading(true);
    setIsLoadImgError(false);
    try {
      const result = await request_getImg({
        limit: 5,
      });

      if (!result) {
        throw new Error(result.message || 'Error!');
      }

      setImg(result);
    } catch (error) {
      console.error(error);
      setIsLoadImgError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function voteImg({
    voteValue,
    imgId,
  }: {
    voteValue: 1 | 0;
    imgId: string;
  }) {
    if (!img) return;

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
        const filterImg = img.filter((item) => item.id !== imgId);
        setImg(filterImg);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setIsVotingError(true);
      console.error(error);
    } finally {
      setVotedImg(null);
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
          />
        </View>
      ) : (
        <>
          {img.map((item, index) => {
            return (
              <VotingImageCard
                key={item.id}
                isError={isVotingError}
                order={img.length - index}
                imgId={item.id}
                imgSource={{
                  uri: item.url,
                }}
                votedImg={votedImg}
                handleVoteImg={(voteResult) =>
                  voteImg({ voteValue: voteResult, imgId: item.id })
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
          <Pressable style={styles.otherButtonWrapper}>
            <AntDesign name="setting" size={26} color="black" />
          </Pressable>
          <Button
            label="NOPE IT"
            type="vote-down"
            onPress={() => !!img && voteImg({ voteValue: 0, imgId: img[0].id })}
            disabled={isLoading}
            isHighLightVoteDown={isHighLightVoteDown}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="LOVE IT"
            type="vote-up"
            onPress={() => !!img && voteImg({ voteValue: 1, imgId: img[0].id })}
            disabled={isLoading}
            isHighLightVoteUp={isHighLightVoteUp}
          />
          <Pressable style={styles.otherButtonWrapper}>
            {/* <AntDesign name="heart" size={24} color="#f70707" /> */}
            <AntDesign name="hearto" size={20} color="black" />
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
    paddingTop: '5%',
    paddingBottom: '5%',
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
