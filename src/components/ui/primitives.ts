import { createBox, createText } from "@shopify/restyle";

import type { AppTheme } from "@/constants/theme";

/** `View` com props de estilo tipadas pelo tema (`padding="md"`, `backgroundColor="surface"`...). */
export const Box = createBox<AppTheme>();

/** `Text` com `variant` e `color` do tema. Prefira `AppText` nas telas. */
export const Text = createText<AppTheme>();
