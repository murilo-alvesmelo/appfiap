import type { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets, type Edge } from "react-native-safe-area-context";

import { useAppTheme } from "@/constants/theme";

import { Box } from "./primitives";

export type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  edges?: Edge[];
};

/**
 * Container raiz de toda tela: fundo do tema, safe area e padding.
 * @param scroll - Envolve o conteúdo em `ScrollView`.
 * @param edges - Bordas que recebem o inset da safe area. Padrão: topo e base.
 */
export function Screen({
  children,
  scroll = false,
  edges = ["top", "bottom"],
}: ScreenProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const safeAreaPadding = {
    paddingTop: edges.includes("top") ? insets.top : 0,
    paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
    paddingLeft: edges.includes("left") ? insets.left : 0,
    paddingRight: edges.includes("right") ? insets.right : 0,
  };

  return (
    <Box
      flex={1}
      backgroundColor="background"
      style={safeAreaPadding}
    >
      {scroll ? (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { padding: theme.spacing.md, gap: theme.spacing.md },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <Box flexGrow={1} padding="md" gap="md">
          {children}
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
});
