---
name: create-feature
description: Cria uma nova feature completa em src/features/<nome> (tipos/mappers em src/data, repository, hook, components, screen, index.ts) e registra a tela no React Navigation (tab do rodapé ou stack/modal). Use quando pedirem um novo módulo/funcionalidade/domínio no app.
---

# Criar feature

Leia antes: a spec do fluxo em `docs/specs/`, `AGENTS.md`, `docs/architecture.md`, `docs/data-fetching.md`, `docs/specs/data-model.md`, `docs/navigation.md`.
Modelos a copiar: `src/features/auth/` (formulário/ação), `src/features/home/` (tela simples) e o exemplo de leitura em `docs/data-fetching.md`.

## Entradas a confirmar

- Nome da feature em `kebab-case` (ex.: `lessons`) → usado em pastas/arquivos
- Spec do fluxo em `docs/specs/` (se não existir, crie a partir do template de `docs/specs/README.md` antes de codar)
- Dados envolvidos (quais campos do `responsaveis.json`)
- Onde a tela aparece: tab do rodapé (`AppTabs`) ou stack/modal (`RootNavigator`)

## Passos

1. **Tipos e mapper** (dados do `responsaveis.json`): no módulo compartilhado `src/data/`, seguindo `docs/specs/data-model.md`
   - `school.dto.ts`: DTO exatamente como no JSON (ex.: `LessonDTO = { horario: string; disciplina: string }`)
   - `school.types.ts`: tipo de domínio em camelCase e em inglês (ex.: `Lesson = { startTime: string; endTime: string; subject: string }`)
   - `school.mappers.ts`: `toXxx` puro + teste em `school.mappers.test.ts`
   - `src/features/<nome>/types/<nome>.types.ts`: **só** tipos próprios da feature (inputs de ação, erros de campo). Crie apenas se precisar.

   Se o DTO/tipo/mapper já existe em `src/data/`, reutilize. Para os detalhes, siga a skill `create-repository`.

2. **Repository**: `src/features/<nome>/api/<nome>.repository.ts` (só repositories importam o JSON, os DTOs e os mappers)

   ```ts
   import guardiansData from "@/data/responsaveis.json";
   import type { GuardianDTO } from "@/data/school.dto";
   import { toDaySchedule } from "@/data/school.mappers";
   import type { DaySchedule } from "@/data/school.types";

   const guardians: GuardianDTO[] = guardiansData;

   export const lessonsRepository = {
     /** @description - Lista a agenda (dias e aulas) de um aluno pelo RM. */
     async listSchedule(rm: number): Promise<DaySchedule[]> {
       const student = guardians.flatMap((item) => item.alunos).find((item) => item.rm === rm);
       if (!student) throw new Error("Aluno não encontrado");
       return student.agenda.map(toDaySchedule);
     },
   };
   ```

3. **Hooks**: `src/features/<nome>/hooks/useLessons.ts`, com `data`/`isLoading`/`error`/`reload` (modelo em `docs/data-fetching.md`).
   Regras de negócio puras (ex.: escolher o dia inicial) ficam em `utils/`, com teste.
   Formulário com validação: função pura em `utils/` + `submit` (veja `features/auth/hooks/useSignIn.ts`).

4. **Components** (UI reutilizável dentro da feature): `components/LessonCard.tsx`, recebendo tudo via props.
   Só `@/components/ui` (`Box`, `AppText`...) + `useAppTheme()` quando precisar de valor do tema (ver `docs/styling.md`).

5. **Screen**: `src/features/<nome>/screens/LessonsScreen.tsx`

   ```tsx
   import { FlatList } from "react-native";

   import { Screen, StateView } from "@/components/ui";

   import { LessonCard } from "../components/LessonCard";
   import { useLessons } from "../hooks/useLessons";

   /** @description - Aulas do dia do aluno selecionado. */
   export function LessonsScreen() {
     const { data, error, isLoading, reload } = useLessons();

     if (isLoading) return <StateView state="loading" />;
     if (error) return <StateView state="error" message={error.message} onRetry={reload} />;
     if (!data?.length) return <StateView state="empty" message="Nenhuma aula neste dia" />;

     return (
       <Screen edges={["top"]}>
         <FlatList data={data} keyExtractor={(item) => `${item.startTime}-${item.subject}`} renderItem={({ item }) => <LessonCard lesson={item} />} />
       </Screen>
     );
   }
   ```

6. **API pública**: `src/features/<nome>/index.ts`

   ```ts
   export { LessonsScreen } from "./screens/LessonsScreen";
   ```

   Tipos de domínio vêm de `@/data/school.types`: não os reexporte pela feature.

7. **Navegação** (ver `docs/navigation.md`):
   - Tab: adicione `Lessons: undefined` em `AppTabsParamList` e `<Tab.Screen name="Lessons" component={LessonsScreen} options={{ title: "Aulas" }} />` em `src/navigation/AppTabs.tsx`
   - Stack/modal: adicione em `RootStackParamList` e registre no grupo logado de `src/navigation/RootNavigator.tsx`

8. **JSDoc**: hook, métodos do repository, utils, components e screen com **JSDoc em pt-BR** (ver `docs/conventions.md`).

9. **Verifique**: `yarn typecheck`, `yarn lint`, `yarn test`, os critérios de aceite da spec (marque-os) e o checklist final do `AGENTS.md`.

## Não faça

- Não instale libs
- Não importe o JSON, `school.dto.ts` ou `school.mappers.ts` fora de um repository
- Não declare DTO do `responsaveis.json` dentro da feature
- Não faça `try/catch` nem mapeamento de dados em screens/components
- Não importe internals de outra feature
- Não crie subpastas vazias que a feature não usa
