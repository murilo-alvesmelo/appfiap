import type { TextProps } from "react-native";

import type { ColorToken, TypographyVariant } from "@/constants/theme";

import { Text } from "./primitives";

export type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: ColorToken;
};

/**
 * Texto padrão do app. Use sempre no lugar de `Text`.
 * @param variant - Estilo tipográfico do tema. Padrão: `body`.
 * @param color - Token de cor do tema. Padrão: `text`.
 */
export function AppText({ variant = "body", color = "text", ...rest }: AppTextProps) {
  return <Text variant={variant} color={color} {...rest} />;
}
