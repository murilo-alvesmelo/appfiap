---
name: create-ui-component
description: Cria um componente visual compartilhado em src/components/ui seguindo os tokens do tema Restyle, acessibilidade e o barrel index.ts. Use quando pedirem um componente genérico reutilizável (card, badge, avatar, divider, etc.).
---

# Criar componente de UI compartilhado

Leia antes: `docs/styling.md`. Modelos: `src/components/ui/Button.tsx`, `Input.tsx`, `StateView.tsx`.

## Quando usar `components/ui`
- O componente é **genérico** (não conhece domínio: nada de `Student`, `Guardian`)
- Se é específico de uma feature, crie em `features/<x>/components/`

## Template
```tsx
import type { ComponentProps } from "react";

import { Box } from "./primitives";

export type CardProps = ComponentProps<typeof Box> & {
  /** Estilo visual do card. `outlined` usa borda em vez de fundo. */
  variant?: "default" | "outlined";
};

/** @description - Container com padding e cantos arredondados para agrupar conteúdo. */
export function Card({ variant = "default", ...rest }: CardProps) {
  return (
    <Box
      padding="md"
      borderRadius="lg"
      backgroundColor={variant === "default" ? "surface" : "background"}
      borderWidth={variant === "outlined" ? 1 : 0}
      borderColor="border"
      {...rest}
    />
  );
}
```

## Regras
- Layout/tokens via props do Restyle (`Box`). Valores do tema fora de props de estilo via `useAppTheme()`
- `StyleSheet` do `react-native` só para valores fixos que não são token
- Estenda as props nativas/do `Box` e repasse `style` e `...rest`
- Variantes via prop union (`variant`), não via componentes duplicados
- Todo valor visual via tema. Se faltar token, adicione em `src/constants/theme.ts` (cores nos temas light **e** dark)
- Texto interno via `AppText`
- Acessibilidade: `accessibilityRole`, `accessibilityLabel`/`accessibilityState` quando interativo
- JSDoc em pt-BR no componente e nas props não óbvias (ver `docs/conventions.md`)
- Exporte no barrel `src/components/ui/index.ts` (componente + tipo de props)
- `yarn typecheck`
