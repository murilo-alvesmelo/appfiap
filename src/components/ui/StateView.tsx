import { ActivityIndicator, StyleSheet } from "react-native";

import { useAppTheme } from "@/constants/theme";

import { AppText } from "./AppText";
import { Button } from "./Button";
import { Box } from "./primitives";

export type StateViewProps =
  | { state: "loading" }
  | { state: "error"; message: string; onRetry?: () => void }
  | { state: "empty"; message: string };

/**
 * @description - Componente para exibir estados de tela (loading, error, empty).
 * @param props - Props do componente.
 * @returns JSX.Element
 */
export function StateView(props: StateViewProps) {
  const theme = useAppTheme();

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap="md"
      padding="lg"
    >
      {props.state === "loading" && (
        <ActivityIndicator color={theme.colors.primary} />
      )}
      {props.state !== "loading" && (
        <AppText
          color={props.state === "error" ? "danger" : "textMuted"}
          style={styles.message}
        >
          {props.message}
        </AppText>
      )}
      {props.state === "error" && props.onRetry && (
        <Button
          title="Tentar novamente"
          variant="secondary"
          onPress={props.onRetry}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
  },
});
