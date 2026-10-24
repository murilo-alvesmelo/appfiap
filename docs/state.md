# Estado

Escolha o **menor escopo possível**:

| Escopo | Ferramenta | Exemplo |
|---|---|---|
| Um componente | `useState` / `useReducer` | valor de inputs no `SignInForm` |
| Uma tela | hook da feature (`useXxx`) | `useSignIn`: erros de campo, loading, erro |
| Dados lidos do repository | hook da feature com `data`/`isLoading`/`error` | ver `docs/data-fetching.md` |
| Várias telas da mesma feature | Context em `features/<x>/store/` | filtros compartilhados entre telas |
| Várias features | Context em `src/providers/<nome>/` | `session` (responsável logado), `theme` |

## Padrão de Context (feature ou global)
Siga `src/providers/session/SessionProvider.tsx`:
- `createContext<Value | undefined>(undefined)`
- Provider com `useState`/`useReducer` + `useCallback` nas ações + `useMemo` no value
- Hook `useXxx()` que lança erro se usado fora do Provider
- `index.ts` exportando Provider, hook e tipos
- Providers globais são montados em `src/App.tsx`

## Regras
- Dados lidos do repository ficam no hook que os carregou. Não copie para Context sem que 2+ features precisem.
- Estado derivado é calculado no render, não guardado.
- Navegação depende do estado (ex.: `isSignedIn`), não de chamadas manuais de `navigate` após login/logout.
