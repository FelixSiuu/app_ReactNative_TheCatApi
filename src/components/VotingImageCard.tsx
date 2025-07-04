import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import {
  ImageSourcePropType,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { pendingVotingPosition } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  isError: boolean;
  imgId: string;
  imgSource: ImageSourcePropType;
  order: number;
  votedImg: {
    id: string;
    value: 1 | 0;
  } | null;
  handleVoteImg: (value: 1 | 0) => void;
  dragEventListener: (position: {
    positionX: number;
    positionY: number;
  }) => void;
};

export default function VotingImageCard({
  isError,
  imgId,
  imgSource,
  order,
  votedImg,
  handleVoteImg,
  dragEventListener,
}: Props) {
  const insets = useSafeAreaInsets();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [isCoverContent, setIsCoverContent] = useState<boolean>(true);

  const handleImgLeft = useCallback(() => {
    translateX.value = withTiming(-windowWidth);
  }, [translateX, windowWidth]);

  const handleImgRight = useCallback(() => {
    translateX.value = withTiming(windowWidth);
  }, [translateX, windowWidth]);

  const handleImgResetPosition = useCallback(() => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  }, [translateX, translateY]);

  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
      runOnJS(dragEventListener)({
        positionX: translateX.value,
        positionY: translateY.value,
      });
    })
    .onFinalize(() => {
      if (translateX.value <= pendingVotingPosition.left) {
        runOnJS(handleImgLeft)();
        runOnJS(handleVoteImg)(0);
        return;
      } else if (translateX.value >= pendingVotingPosition.right) {
        runOnJS(handleImgRight)();
        runOnJS(handleVoteImg)(1);
      } else {
        runOnJS(handleImgResetPosition)();
      }
    });

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (!votedImg || votedImg.id !== imgId) return;

    const { value } = votedImg;

    if (value === 1) {
      handleImgRight();
      return;
    }

    if (value === 0) {
      handleImgLeft();
      return;
    }
  }, [handleImgLeft, handleImgRight, votedImg, imgId]);

  useEffect(() => {
    if (isError) handleImgResetPosition();
  }, [handleImgResetPosition, isError]);

  const handlePressImage = () => {
    setIsCoverContent(!isCoverContent);
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: order,
      }}
    >
      <GestureDetector gesture={drag}>
        <Animated.View style={animatedViewStyle}>
          <Pressable
            onPress={handlePressImage}
            style={{
              width: windowWidth,
              height: windowHeight - 59 - insets.top,
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}
          >
            <Image
              source={imgSource}
              style={{
                width: '100%',
                height: '100%',
              }}
              contentFit={isCoverContent ? 'cover' : 'contain'}
            />
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
