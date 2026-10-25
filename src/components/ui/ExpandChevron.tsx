import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ChevronIcon } from '../svg/ChevronIcon';

export type ExpandChevronProps = {
  isExpanded: boolean;
};

const CHEVRON_DURATION = 250;

/**
 * Chevron fino em `primary`: aponta para baixo fechado e gira suavemente
 * para cima ao abrir. Com "Reduzir movimento", troca sem animação.
 * @param isExpanded - Se o conteúdo controlado está aberto.
 */
export function ExpandChevron({ isExpanded }: ExpandChevronProps) {
  const reduceMotion = useReducedMotion();
  const rotation = useSharedValue(isExpanded ? 180 : 0);

  useEffect(() => {
    rotation.value = withTiming(isExpanded ? 180 : 0, {
      duration: reduceMotion ? 0 : CHEVRON_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [isExpanded, reduceMotion, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ChevronIcon />
    </Animated.View>
  );
}
