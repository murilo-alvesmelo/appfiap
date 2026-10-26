# AGENTS.md

Regras do projeto para qualquer agente de IA (Claude Code, Cursor, Copilot, Codex…) e para devs.
**Siga estas regras sempre.** Para detalhes, leia o doc correspondente em `docs/` antes de implementar.
Requisitos do produto: `teste-tecnico-mobile.md`.
**Antes de implementar um fluxo, leia a spec dele em `docs/specs/`** (critérios de aceite = definição de pronto).

## Stack (fechada)

- **React Native CLI 0.88** + TypeScript (strict).
- Navegação: **React Navigation** (native-stack + bottom-tabs), em `src/navigation/`. Ver `docs/navigation.md`
- Estilo: **Restyle** (`@shopify/restyle`): `Box`/`AppText` com props de tokens e `useAppTheme()`; temas light/dark em `src/constants/theme.ts`. Ver `docs/styling.md`
- Dados: **JSON local** lido pelos repositories das features (sem HTTP). Ver `docs/data-fetching.md`
- Estado: React puro: `useState`/`useReducer`, Context em `src/providers/`
- Animação: **Reanimated 4** (`react-native-reanimated` + `react-native-worklets`).
- Persistência: **AsyncStorage**, usado **só** via `@/lib/storage` (nunca importe o AsyncStorage direto)
- Gerenciador de pacotes: **yarn**

**Não instale dependências** sem o dev pedir explicitamente.
Nada de Zustand, Redux, axios, TanStack Query, NativeWind, styled-components etc. sem aprovação do dev.

## Estrutura de pastas

```
index.js          # registra `App` de src/App.tsx
src/
  App.tsx         # providers globais + NavigationContainer
  navigation/     # navigators (RootNavigator, AppTabs) + param lists tipadas
  data/           # responsaveis.json + DTOs, tipos de domínio e mappers compartilhados (ver docs/specs/data-model.md)
  features/<x>/   # Um módulo por domínio (auth, ...)
    api/          #   <x>.repository.ts: lê a fonte de dados (JSON) e mapeia DTO -> tipo de domínio
    hooks/        #   useXxx.ts: chama o repository + regras + loading/erro (camada de negócio)
    components/   #   componentes visuais da feature (recebem tudo via props)
    screens/      #   XxxScreen.tsx: compõe hooks + components
    store/        #   (opcional) Context/reducer próprio da feature
    types/        #   <x>.types.ts: tipos de domínio + DTOs
    utils/        #   funções puras (validação, formatação) sem React
    index.ts      #   API pública da feature: ÚNICO ponto de import de fora
  components/ui/  # primitivos compartilhados (Box, AppText, Button, Input, Screen, StateView)
  providers/      # providers globais (session, theme). Mínimo possível.
  lib/            # helpers de infra (logger, storage)
  utils/          # funções puras genéricas, sem domínio
  constants/      # theme.ts (tema Restyle light/dark + useAppTheme)
assets/           # imagens/ícones (raiz do projeto)
```

## Regras de dependência (camadas)

```
navigation/ → features/<x>/index.ts → screens → components + hooks → api (repository) → dados (JSON)
```

1. **Screens e components nunca acessam a fonte de dados.** Dados vêm de hooks da feature.
2. **Só repositories (`features/<x>/api/`) importam os arquivos de dados (JSON), os DTOs e os mappers de `src/data/`.** Os tipos de domínio (`@/data/school.types`) podem ser importados por qualquer camada.
3. **DTOs (formato do JSON) não saem do repository.** Converta sempre para tipos de domínio (camelCase).
4. **Uma feature não importa o interior de outra.** Use apenas `@/features/<outra>` (o `index.ts`).
5. `components/ui`, `components/layout`, `providers`, `lib`, `utils`, `constants` **nunca importam de `features/`**.
6. `utils/` e `types/` não importam React nem React Native.
7. `navigation/` só monta navigators e registra screens: sem regra de negócio nem estilo de tela.
8. Estado global só em `src/providers/` e só quando 2+ features precisam. Prefira estado local.
9. **Hooks da feature são a camada de negócio:** chamam o repository, expõem `data`/`isLoading`/`error` (ou `submit`) e tratam erros. Um hook por caso de uso.

## Convenções

- Componentes/screens: `PascalCase.tsx` (`SignInForm.tsx`, `SignInScreen.tsx`)
- Hooks: `useCamelCase.ts`. Repositories: `<feature>.repository.ts`. Tipos: `<feature>.types.ts`
- Nomes de rotas (telas registradas no navigator): `PascalCase` (`SignIn`, `AppTabs`, `Lessons`)
- **Named exports** em tudo. Sem `export default`
- Imports absolutos com `@/` entre módulos; relativos (`../`) só dentro da mesma feature (ou de `navigation/`)
- Ordem de imports: libs externas → `@/` → relativos, separados por linha em branco
- TypeScript strict: proibido `any`, `@ts-ignore` e `as` desnecessário. Use `type` (não `interface`)
- Código e identificadores em **inglês**. Textos de UI em **pt-BR**
- **JSDoc em pt-BR** em toda função exportada (hooks, métodos de repository, utils, components, screens): descrição + `@param`/`@returns` quando não óbvios. Ver `docs/conventions.md`
- Layout e tokens via props do Restyle (`<Box padding="md" gap="sm" backgroundColor="surface">`)
- Valores do tema em props que não são de estilo (`color` de `ActivityIndicator`, cores da tab bar) via `useAppTheme()`
- `StyleSheet` do `react-native` só para valores fixos que não são token (`minHeight: 48`, `opacity: 0.5`, `flexGrow: 1`)
- Cores, espaçamentos, raios e fontes **só via tema** (`@/constants/theme`). Nunca valores literais
- Textos sempre via `<AppText>`. Telas sempre dentro de `<Screen>`. Loading/erro/vazio via `<StateView>`
- Logs via `@/lib/logger`, nunca `console.*` direto

## Feature de referência

Use `src/features/auth/` (formulário + ação assíncrona) e `src/features/lessons/` (tela simples) como **modelo**.
Para leitura de dados, siga o exemplo de `docs/data-fetching.md`.
Ao criar código novo, copie o formato desses arquivos.

## Skills / receitas

Para tarefas recorrentes, siga a receita em `.claude/skills/<nome>/SKILL.md`:

| Tarefa | Skill |
|---|---|
| Nova feature (módulo completo + registro na navegação) | `create-feature` |
| Nova tela em feature existente | `create-screen` |
| Novo dado/consulta (DTO + repository + hook) | `create-repository` |
| Novo componente compartilhado | `create-ui-component` |

## Documentação

- `docs/specs/`: uma spec por fluxo (SDD), com regras e critérios de aceite
- `docs/architecture.md`: camadas e fluxo de dados
- `docs/folder-structure.md`: o que entra e o que não entra em cada pasta
- `docs/data-fetching.md`: JSON → repository → hook → screen, erros e loading
- `docs/state.md`: estado local vs. feature vs. global
- `docs/navigation.md`: React Navigation, param lists, fluxo de autenticação
- `docs/styling.md`: Restyle, temas/tokens e componentes de UI
- `docs/conventions.md`: nomes, imports, TS

## Antes de concluir qualquer tarefa

- [ ] Critérios de aceite da spec (`docs/specs/`) atendidos e marcados
- [ ] `yarn typecheck` passa sem erros
- [ ] `yarn lint` e `yarn test` passam
- [ ] Nenhuma regra de dependência violada (imports conferidos)
- [ ] `index.ts` da feature exporta o que é usado de fora (e só isso)
- [ ] Nenhuma cor/tamanho hardcoded
- [ ] Nenhum `any`
- [ ] Funções exportadas novas/alteradas têm JSDoc em pt-BR
- [ ] Nenhuma dependência instalada sem pedido explícito
