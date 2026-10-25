import * as React from 'react-native-worklets';
import Svg, { Path } from 'react-native-svg';

export const ChevronIcon = () => (
  <Svg width={16} height={10} viewBox="0 0 16 10" fill="none">
    <Path
      d="M1 1l7 7 7-7"
      stroke="#0BA892"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
