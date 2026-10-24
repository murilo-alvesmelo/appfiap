# Estilo

Estilo com **[Restyle](https://github.com/Shopify/restyle)** (`@shopify/restyle`): componentes com props tipadas pelos tokens do tema (light/dark).
Os tokens (cores, espaçamentos, raios, tipografia, breakpoints) ficam em `src/constants/theme.ts`.

## Regras
- Layout e tokens via **props do Restyle** no `Box`/`AppText`: `<Box padding="md" gap="sm" borderRadius="md" backgroundColor="surface">`
- Valores do tema fora de props de estilo (`color` de `ActivityIndicator`, `placeholderTextColor`, cores da tab bar, `contentContainerStyle`) via `const theme = useAppTheme()`
- Estados dinâmicos (variant, pressed, erro) com `useAppTheme()` + condicional no array de `style`
- `StyleSheet.create` do `react-native` **só** para valores fixos que não são token (`minHeight: 48`, `opacity: 0.5`, `flexGrow: 1`, `textAlign`), declarado no fim do arquivo em `const styles`
- Nada de `"#fff"`, `padding: 13`, `fontSize: 15` literais. Falta token? Adicione em `theme.ts` (cor: **nos dois temas**)
- Não importe `lightTheme`/`darkTheme` em componentes para estilizar: o valor não troca com o tema. Use props ou `useAppTheme()`
- Safe area via `useSafeAreaInsets()` (o `Screen` já cuida disso)
- Composição: `style={[styles.base, { ...valores do tema }, style]}`

## Exemplo
```tsx
import { Pressable, StyleSheet, type PressableProps } from "react-native";

import { useAppTheme } from "@/constants/theme";

import { AppText } from "./AppText";

export type ButtonProps = Omit<PressableProps, "children"> & {
  title: string;
  /** Estilo visual. `secondary` usa fundo neutro com borda. */
  variant?: "primary" | "secondary";
};

/** @description - Botão de ação principal do app. */
export function Button({ title, variant = "primary", style, ...rest }: ButtonProps) {
  const theme = useAppTheme();
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      style={[
        styles.base,
        { paddingHorizontal: theme.spacing.lg, borderRadius: theme.borderRadii.md },
        isPrimary
          ? { backgroundColor: theme.colors.primary }
          : { backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.border },
        style,
      ]}
      {...rest}
    >
      <AppText variant="label" color={isPrimary ? "onPrimary" : "primary"}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 48, alignItems: "center", justifyContent: "center" },
});
```

Layout simples, só com tokens:
```tsx
<Box flex={1} alignItems="center" justifyContent="center" gap="md" padding="lg">
  <AppText variant="subtitle">Sem aulas hoje</AppText>
</Box>
```

## Tema (`src/constants/theme.ts`)
- `lightTheme = createTheme({ colors, spacing, borderRadii, breakpoints, textVariants })`; `AppTheme = typeof lightTheme`
- `darkTheme: AppTheme = { ...lightTheme, colors: {...} }`: só `colors` muda. Faltar uma cor é erro de compilação
- `textVariants` tem `defaults` (corpo + `color: "text"`) e as variantes `title`, `subtitle`, `body`, `caption`, `label`
- Tipos: `ColorToken = keyof AppTheme["colors"]`, `TypographyVariant` (variantes sem `defaults`). Use com `import type`
- `useAppTheme()`: `useTheme<AppTheme>()` tipado
- Breakpoints (`xs: 0`, `sm`, `md`, `lg`, `xl`) permitem props responsivas: `padding={{ xs: "md", md: "xl" }}`
- Os nomes das cores são **semânticos** (`background`, `text`, `primary`, `onPrimary`), nunca a cor em si (`blue`, `white`)

## Tema claro/escuro
- `src/providers/theme/ThemeProvider.tsx` (`AppThemeProvider`) escolhe `lightTheme`/`darkTheme` via `useIsDarkTheme()` e ajusta a `StatusBar`
- O tema padrão é **dark**. Para mudar (`dark` | `light` | `system`), edite `COLOR_SCHEME_PREFERENCE` em `src/providers/theme/useIsDarkTheme.ts`. O `App.tsx` usa o mesmo hook para o tema do React Navigation
- `src/App.tsx` deriva o tema do React Navigation das mesmas cores (fundo, card, borda)
- Escolha manual de tema (se for implementada) mora no `AppThemeProvider`, nunca em components

## Componentes de UI (`@/components/ui`)
| Componente | Uso |
|---|---|
| `Box` | `View` com props do tema (`padding`, `gap`, `backgroundColor`, `borderRadius`...) |
| `AppText` | Todo texto. Props `variant` (`title`, `subtitle`, `body`, `caption`, `label`) e `color` (token) |
| `Button` | Ações. `variant` `primary`/`secondary`, `isLoading` |
| `Input` | Campo com `label` e `error` |
| `Screen` | Container raiz de toda tela (safe area, padding, `scroll`, `edges`) |
| `StateView` | Estados `loading`, `error` (com `onRetry`) e `empty` |

Nunca use `Text` do react-native (nem o `Text` do Restyle) diretamente em features. Use `AppText`.
