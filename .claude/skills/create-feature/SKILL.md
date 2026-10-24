---
name: create-feature
description: Cria uma nova feature completa em src/features/<nome> (types, repository, hook, components, screen, index.ts) e registra a tela no React Navigation (tab do rodapé ou stack/modal). Use quando pedirem um novo módulo/funcionalidade/domínio no app.
---

# Criar feature

Leia antes: `AGENTS.md`, `docs/architecture.md`, `docs/data-fetching.md`, `docs/navigation.md`.
Modelos a copiar: `src/features/auth/` (formulário/ação), `src/features/home/` (tela simples) e o exemplo de leitura em `docs/data-fetching.md`.

## Entradas a confirmar

- Nome da feature em `kebab-case` (ex.: `lessons`) → usado em pastas/arquivos
- Dados envolvidos (quais campos do JSON)
- Onde a tela aparece: tab do rodapé (`AppTabs`) ou stack/modal (`RootNavigator`)

## Passos

1. **Tipos**: `src/features/<nome>/types/<nome>.types.ts`

   ```ts
   export type Lesson = { id: string; subject: string; startsAt: string; endsAt: string };

   /** Formato do JSON. */
   export type LessonDTO = { id: string; subject: string; start_time: string; end_time: string };
   ```

2. **Repository**: `src/features/<nome>/api/<nome>.repository.ts` (único a importar o JSON)

   ```ts
   export const lessonsRepository = {
     async listByDay(studentId: string, weekday: number): Promise<Lesson[]> {
       const dtos = schedules.filter((item) => item.student_id === studentId && item.weekday === weekday);
       return dtos.map(toLesson);
     },
   };

   function toLesson(dto: LessonDTO): Lesson {
     return { id: dto.id, subject: dto.subject, startsAt: dto.start_time, endsAt: dto.end_time };
   }
   ```

3. **Hooks**: `src/features/<nome>/hooks/useLessons.ts`, com `data`/`isLoading`/`error`/`reload` (modelo em `docs/data-fetching.md`).
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
     const { data, error, isLoading, reload } = useLessons(studentId, weekday);

     if (isLoading) return <StateView state="loading" />;
     if (error) return <StateView state="error" message={error.message} onRetry={reload} />;
     if (!data?.length) return <StateView state="empty" message="Nenhuma aula neste dia" />;

     return (
       <Screen edges={["top"]}>
         <FlatList data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <LessonCard lesson={item} />} />
       </Screen>
     );
   }
   ```

6. **API pública**: `src/features/<nome>/index.ts`

   ```ts
   export { LessonsScreen } from "./screens/LessonsScreen";
   export type { Lesson } from "./types/lessons.types";
   ```

7. **Navegação** (ver `docs/navigation.md`):
   - Tab: adicione `Lessons: undefined` em `AppTabsParamList` e `<Tab.Screen name="Lessons" component={LessonsScreen} options={{ title: "Aulas" }} />` em `src/navigation/AppTabs.tsx`
   - Stack/modal: adicione em `RootStackParamList` e registre no grupo logado de `src/navigation/RootNavigator.tsx`

8. **JSDoc**: hook, métodos do repository, utils, components e screen com **JSDoc em pt-BR** (ver `docs/conventions.md`).

9. **Verifique**: `yarn typecheck`, `yarn lint` e o checklist final do `AGENTS.md`.

## Não faça

- Não instale libs
- Não importe o JSON fora do repository
- Não faça `try/catch` nem mapeamento de dados em screens/components
- Não importe internals de outra feature
- Não crie subpastas vazias que a feature não usa
