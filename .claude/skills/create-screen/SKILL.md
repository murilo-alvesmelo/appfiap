---
name: create-screen
description: Adiciona uma nova tela a uma feature existente e a registra no React Navigation (tab, stack ou modal), com param list tipada. Use quando pedirem uma nova tela/página dentro de um domínio que já existe.
---

# Criar screen

Leia antes: `docs/navigation.md`, `docs/styling.md`.

## Passos

1. **Screen**: `src/features/<feature>/screens/<Nome>Screen.tsx`
   - Envolva em `<Screen>` (use `scroll` para formulários/conteúdo longo; ajuste `edges` conforme header/tab)
   - Dados vêm de hooks da própria feature. Se não existir, crie (ver skill `create-repository`)
   - Trate `isLoading` / `error` / vazio com `<StateView>`
   - Texto só com `<AppText>`; layout com `Box` e props de tokens; `useAppTheme()` para valores do tema fora de props de estilo

   Parâmetros de rota: leia na screen e passe ao hook:
   ```tsx
   import type { NativeStackScreenProps } from "@react-navigation/native-stack";

   import type { RootStackParamList } from "@/navigation";

   type Props = NativeStackScreenProps<RootStackParamList, "ReportCard">;

   /** @description - Boletim do ano selecionado. */
   export function ReportCardScreen({ route }: Props) {
     const { data, error, isLoading, reload } = useReportCard(route.params.year);
     // ...
   }
   ```

2. **Exporte** no `src/features/<feature>/index.ts`.

3. **Param list**: adicione a rota (`PascalCase`) em `src/navigation/navigation.types.ts` (`undefined` se não tiver parâmetros).

4. **Registre** no navigator:
   - Tab do rodapé → `src/navigation/AppTabs.tsx`
   - Stack/modal → grupo logado de `src/navigation/RootNavigator.tsx` (`options={{ presentation: "modal" }}` para modal)

5. **Navegação** para a tela: `const navigation = useNavigation(); navigation.navigate("ReportCard", { year: 2025 })`.
   Para retornar: `navigation.goBack()`.

6. **JSDoc**: a screen (e hooks/components novos) com **JSDoc em pt-BR** (ver `docs/conventions.md`).

7. `yarn typecheck`.
