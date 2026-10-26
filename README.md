# App FIAP School
O aplicativo interage com dados lidos de um JSON local (`src/data/responsaveis.json`), sem backend.

## Objetivo

O responsável entra com **CPF e senha** e, a partir daí, consegue:

- **Login e sessão**: CPF com máscara `XXX.XXX.XXX-XX`, mensagem de erro única para credenciais inválidas e sessão mantida ao fechar e reabrir o app (abre direto em **Aulas**).
- **Header**: primeiro nome do responsável, dados do aluno selecionado (primeiro nome, RM, turma e período) e botão de logout.
- **Aulas**: aulas do dia (horário e disciplina), com navegação entre os dias da semana.
- **Boletim**: ano, turma, trimestres, disciplinas, notas e faltas, com acesso a anos anteriores.
- **Seleção de aluno**: disponível só quando o responsável tem 2 ou mais alunos. Mostra nome completo, RM e turma.

Cada fluxo tem uma spec com regras de negócio e critérios de aceite em [`docs/specs/`](docs/specs/README.md).

## Stack e dependências

| Área | Biblioteca |
|---|---|
| Base | React Native CLI 0.88, React 19.3, TypeScript (strict) |
| Navegação | `@react-navigation/native`, `native-stack`, `bottom-tabs`, `react-native-screens`, `react-native-safe-area-context` |
| Estilo | `@shopify/restyle` (temas light/dark em `src/constants/theme.ts`) |
| Animação | `react-native-reanimated` 4 + `react-native-worklets` |
| Persistência | `@react-native-async-storage/async-storage` (via `src/lib/storage.ts`) |
| Ícones / splash | `react-native-svg`, `react-native-bootsplash` |
| Qualidade | ESLint, Prettier, Jest |

O estado usa só React (`useState`/`useReducer`/Context).

## Pré-requisitos

- **Node.js** >= 22.11
- **Yarn**
- Ambiente React Native configurado: veja [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)
  - **Android**: JDK 17 e Android Studio (SDK + emulador ou dispositivo)
  - **iOS** (só macOS): Xcode, Ruby (>= 2.6.10) e Bundler para o CocoaPods

## Como executar

1. Instale as dependências JS:

   ```sh
   yarn install
   ```

2. (iOS) Instale os pods. Na primeira vez, rode o Bundler para instalar o CocoaPods:

   ```sh
   bundle install
   cd ios && bundle exec pod install && cd ..
   ```

   Rode `pod install` de novo sempre que atualizar dependências nativas.

3. Inicie o Metro:

   ```sh
   yarn start
   ```

4. Em outro terminal, rode o app:

   ```sh
   yarn android   # Android
   yarn ios       # iOS
   ```

### Credenciais de teste

Os dados vêm de `src/data/responsaveis.json`. Exemplos:

| CPF | Senha | Responsável |
|---|---|---|
| `969.294.560-04` | `123456` | Gustavo (2 alunos) |
| `508.795.670-07` | `987654` | Adelaide (1 aluno) |

## Scripts

| Comando | O que faz |
|---|---|
| `yarn start` | Inicia o Metro bundler |
| `yarn android` / `yarn ios` | Compila e roda o app |
| `yarn typecheck` | Checa os tipos (`tsc --noEmit`) |
| `yarn lint` | Roda o ESLint |
| `yarn test` | Roda os testes com Jest |

## Estrutura

```
src/
  App.tsx         # providers globais + NavigationContainer
  navigation/     # navigators e param lists tipadas
  data/           # responsaveis.json, DTOs, tipos de domínio e mappers
  features/       # auth, lessons, report-card, students (api, hooks, components, screens)
  components/ui/  # componentes compartilhados (Box, AppText, Button, Input, Screen, StateView)
  providers/      # estado global (sessão, tema)
  lib/            # infraestrutura (logger, storage)
  constants/      # tema Restyle
```

# Screenshots
