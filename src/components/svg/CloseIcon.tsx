import Svg, { Path } from 'react-native-svg';

type CloseIconProps = {
  color: string;
};

/**
 * @description - Ícone "X" de fechar (modal de seleção de aluno).
 * @param color - Cor do traço.
 */
export const CloseIcon = ({ color }: CloseIconProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M1 1l18 18M19 1L1 19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
