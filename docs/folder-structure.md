# Estrutura de pastas

## `src/App.tsx`: raiz do app
- Providers globais (`SafeAreaProvider`, `AppThemeProvider`, `SessionProvider`) + `NavigationContainer` + `RootNavigator`.
- Registrado em `index.js` (raiz do projeto).

## `src/navigation/`: navegação (React Navigation)
- **Entra:** navigators (`RootNavigator.tsx`, `AppTabs.tsx`), `navigation.types.ts` (param lists), `index.ts`.
- **Não entra:** lógica de negócio, chamadas de dados, estilos de tela.
- Screens são importadas de `@/features/<x>` e registradas com `<Stack.Screen>` / `<Tab.Screen>`.

## `src/features/<feature>/`: módulos de domínio
| Pasta | Entra | Não entra |
|---|---|---|
| `api/` | `<feature>.repository.ts` (lê o JSON, mapeia DTO → domínio) | React, hooks, UI |
| `hooks/` | `useXxx.ts`: chama o repository, regras, `isLoading`/`error` para a tela | JSX, estilos, import direto do JSON |
| `components/` | Componentes visuais da feature, recebem dados/callbacks via props | acesso a dados, `useSession` (prefira props) |
| `screens/` | `XxxScreen.tsx`: compõe hooks + components + `Screen` | acesso a dados, mapeamento de DTO |
| `store/` | (opcional) Context/reducer quando várias telas da feature compartilham estado | estado usado por outras features (vai para `src/providers`) |
| `types/` | `<feature>.types.ts`: tipos de domínio e DTOs | lógica, React |
| `utils/` | Funções puras: validação, formatação, cálculos | React, I/O |
| `index.ts` | Reexports públicos (screens, tipos e hooks usados fora) | `export *` indiscriminado |

Crie apenas as subpastas que a feature usa.

## Compartilhados
| Pasta | Entra | Não entra |
|---|---|---|
| `components/ui/` | Primitivos genéricos (`Box`, `AppText`, `Button`, `Input`, `Screen`, `StateView`) com barrel `index.ts` | qualquer coisa que conheça domínio |
| `components/layout/` | Peças do shell autenticado usadas pela navegação (`AuthenticatedHeader` + `AppHeader`). Podem ler `providers/` e usar tipos de `@/data/school.types` | importar `features/`, acessar dados/repositories |
| `components/forms/` | Composições de formulário reutilizadas por 2+ features | formulários de uma feature só |
| `providers/` | Providers globais (Context + hook, ex.: `session/`, `theme/`) usados por 2+ features, montados em `src/App.tsx` | estado de uma feature só |
| `lib/` | Infra e helpers genéricos (`logger`) | domínio |
| `utils/` | Funções puras genéricas (datas, strings) | domínio, React |
| `data/` | `responsaveis.json`, `school.dto.ts` (DTOs), `school.types.ts` (domínio), `school.mappers.ts` (+ testes). Ver `docs/specs/01-data-model.md` | React, I/O além do JSON. JSON, DTOs e mappers só são importados por repositories; `school.types.ts` por qualquer camada |
| `constants/` | `theme.ts` (tema Restyle light/dark, tipos de token, `useAppTheme`), constantes globais | lógica |
