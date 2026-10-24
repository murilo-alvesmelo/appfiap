# Convenções de código

## Nomes de arquivo
| Tipo | Padrão | Exemplo |
|---|---|---|
| Componente / Screen | `PascalCase.tsx` | `SignInForm.tsx`, `SignInScreen.tsx` |
| Hook | `useCamelCase.ts` | `useSignIn.ts` |
| Repository | `<feature>.repository.ts` | `auth.repository.ts` |
| Tipos | `<feature>.types.ts` | `auth.types.ts` |
| Utils | `camelCase.ts` | `validation.ts` |
| Navigator | `PascalCase.tsx` | `RootNavigator.tsx`, `AppTabs.tsx` |
| Nome de rota (no navigator) | `PascalCase` | `SignIn`, `Lessons`, `StudentPicker` |
| Pasta de feature | `kebab-case` | `features/order-history/` |

## Nomes de hooks
| O quê | Padrão | Exemplo |
|---|---|---|
| Hook de leitura | `use<Recurso>` | `useLessons(day)`, `useReportCard(year)` |
| Hook de ação | `use<Verbo><Recurso>` | `useSignIn`, `useSelectStudent` |

## Exports
- Named exports sempre. Sem `export default`
- `index.ts` por feature e em `components/ui`, `navigation`, `providers/<x>`

## Imports
```ts
import { useState } from "react";              // 1. externos
import { ActivityIndicator } from "react-native";

import { Button } from "@/components/ui";       // 2. absolutos @/
import { logger } from "@/lib/logger";

import { useSignIn } from "../hooks/useSignIn"; // 3. relativos (mesma feature)
```
- Entre módulos: `@/...`. Dentro da própria feature: relativo
- De outra feature: só `@/features/<x>`, nunca `@/features/<x>/hooks/...`

## TypeScript
- `strict` + `noUncheckedIndexedAccess`
- `type` em vez de `interface`. Única exceção: declaration merging de libs (ex.: `interface RootParamList` em `src/navigation/navigation.types.ts`)
- Proibido `any`, `@ts-ignore`, `!` (non-null) sem justificativa
- Props tipadas como `type XxxProps = {...}` acima do componente
- DTOs com sufixo `DTO` e campos como estão no JSON; tipos de domínio em camelCase

## Componentes
- Function components: `export function Xxx(props: XxxProps)`
- Componentes de feature são **apresentacionais**: dados e callbacks via props
- Screens montam: hook(s) da feature + components + `Screen`/`StateView`

## Idioma
- Código e nomes: inglês
- JSDoc: pt-BR
- Textos exibidos ao usuário: pt-BR
- Docs do projeto: pt-BR

## Comentários e JSDoc
Toda função **exportada** (hooks, métodos de repository, utils, components, screens, helpers de `lib/`)
é documentada com **JSDoc em pt-BR**:

- `@description` - Primeira linha: o que a função faz / qual o seu papel na camada
- `@param` para cada parâmetro cujo significado não é óbvio pelo nome/tipo
- `@returns` quando o retorno não é óbvio (ex.: objeto de estado de um hook)
- Os tipos ficam no TypeScript: **não** repita tipos no JSDoc (`@param {string} x` é proibido)

```ts
/**
 * @description - Orquestra o login: valida as credenciais, chama o repository e salva a sessão.
 *
 * @returns `submit` para enviar o formulário, erros por campo, `isLoading` e `errorMessage`.
 */
export function useSignIn() { ... }

/**
 * @description - Valida as credenciais de login antes de chamar o repository.
 *
 * @param credentials - E-mail e senha digitados pelo usuário.
 * @returns Mensagens de erro por campo (objeto vazio se tudo estiver válido).
 */
export function validateSignIn(credentials: SignInCredentials): SignInFieldErrors { ... }
```

Componentes: JSDoc no componente:
```tsx

/** 
 * @description - Container com padding e cantos arredondados para agrupar conteúdo. 
 */
export function Card(props: CardProps) { ... }
```

Funções privadas (ex.: mapeadores `toXxx` do repository) só levam JSDoc se a lógica não for óbvia.
Comentários de linha: curtos, explicando o **porquê**, não o quê.
