import Svg, { Path } from 'react-native-svg';

import { useAppTheme } from '@/constants/theme';

/** Chevron fino apontando para baixo, na cor `primary` do tema ativo. */
export const ChevronIcon = () => {
  const theme = useAppTheme();

  return (
    <Svg width={16} height={10} viewBox="0 0 16 10" fill="none">
      <Path
        d="M1 1l7 7 7-7"
        stroke={theme.colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
