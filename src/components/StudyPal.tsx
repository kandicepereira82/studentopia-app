import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { StudyPalAnimal } from "../types";

interface StudyPalProps {
  animal: StudyPalAnimal;
  name: string;
  animationsEnabled: boolean;
  size?: number;
  message?: string;
}

const StudyPal: React.FC<StudyPalProps> = ({
  animal,
  name,
  animationsEnabled,
  size = 80,
  message,
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (animationsEnabled) {
      switch (animal) {
        case "cat":
          // Blinking animation - scale vertically
          scale.value = withRepeat(
            withSequence(
              withTiming(1, { duration: 2000 }),
              withTiming(0.9, { duration: 100 }),
              withTiming(1, { duration: 100 }),
            ),
            -1,
            false,
          );
          break;
        case "bunny":
          // Hopping animation
          translateY.value = withRepeat(
            withSequence(
              withTiming(-10, { duration: 300, easing: Easing.out(Easing.ease) }),
              withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) }),
              withTiming(0, { duration: 1000 }),
            ),
            -1,
            false,
          );
          break;
        case "bear":
          // Waving animation - rotate
          rotation.value = withRepeat(
            withSequence(
              withTiming(0, { duration: 1000 }),
              withTiming(15, { duration: 200 }),
              withTiming(-15, { duration: 400 }),
              withTiming(15, { duration: 400 }),
              withTiming(0, { duration: 200 }),
            ),
            -1,
            false,
          );
          break;
        case "dog":
          // Tail wagging - slight rotation
          rotation.value = withRepeat(
            withSequence(
              withTiming(5, { duration: 200 }),
              withTiming(-5, { duration: 200 }),
            ),
            -1,
            true,
          );
          break;
        case "fox":
          // Curious head tilt
          rotation.value = withRepeat(
            withSequence(
              withTiming(10, { duration: 1000 }),
              withTiming(0, { duration: 1000 }),
              withTiming(-10, { duration: 1000 }),
              withTiming(0, { duration: 1000 }),
            ),
            -1,
            false,
          );
          break;
        case "panda":
          // Gentle bobbing
          translateY.value = withRepeat(
            withSequence(
              withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
              withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            ),
            -1,
            false,
          );
          break;
      }
    }
  }, [animal, animationsEnabled]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
      { translateY: translateY.value },
    ],
  }));

  const getAnimalEmoji = (animal: StudyPalAnimal): string => {
    switch (animal) {
      case "cat":
        return "🐱";
      case "bunny":
        return "🐰";
      case "bear":
        return "🐻";
      case "dog":
        return "🐶";
      case "fox":
        return "🦊";
      case "panda":
        return "🐼";
      default:
        return "🐱";
    }
  };

  return (
    <View className="items-center">
      <Animated.View style={animatedStyle}>
        <Text style={{ fontSize: size }}>{getAnimalEmoji(animal)}</Text>
      </Animated.View>
      {message && (
        <View className="mt-2 bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 max-w-xs">
          <Text className="text-xs text-gray-600 dark:text-gray-300 font-medium">
            {name} says:
          </Text>
          <Text className="text-sm text-gray-800 dark:text-gray-100 mt-1">
            {message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default StudyPal;
