# Dados

Pipeline: **JSON → repository → hook → screen**.

| Etapa | Arquivo | Responsabilidade |
|---|---|---|
| fonte | arquivo JSON local (ex.: `src/data/*.json`) | dados brutos (DTO) |
| repository | `features/<x>/api/<x>.repository.ts` | lê a fonte, mapeia DTO → domínio, lança `Error` com mensagem em pt-BR |
| hook | `features/<x>/hooks/useXxx.ts` | chama o repository, expõe `data`/`isLoading`/`error` (ou `submit`) |
| screen | `features/<x>/screens/XxxScreen.tsx` | renderiza `data` / `isLoading` / `error` |

## Regras de ouro

1. **Só o repository importa o JSON.** Hooks, screens e components nunca.
2. **DTO não sai do repository.** Os hooks recebem tipos de domínio (camelCase).
3. **Repository é assíncrono** (`Promise`), mesmo lendo JSON local: trocar por uma API depois não muda os hooks.
4. **Erros**: o repository lança `Error` com mensagem para o usuário; o hook captura, loga via `@/lib/logger` e expõe `error`/`errorMessage`.
5. **Screens não fazem `try/catch`** nem transformam dados: só consomem o hook.

## 1. Repository (`features/<x>/api/<x>.repository.ts`)
```ts
import guardiansData from "@/data/guardians.json";

import type { GuardianDTO, Student } from "../types/students.types";

const guardians: GuardianDTO[] = guardiansData;

export const studentsRepository = {
  /** @description - Lista os alunos vinculados a um responsável. */
  async listByGuardian(guardianId: string): Promise<Student[]> {
    const guardian = guardians.find((item) => item.id === guardianId);
    if (!guardian) throw new Error("Responsável não encontrado");
    return guardian.students.map(toStudent);
  },
};

function toStudent(dto: GuardianDTO["students"][number]): Student {
  return { id: dto.id, fullName: dto.full_name, rm: dto.rm, className: dto.class_name };
}
```
- Objeto `const` com métodos async. Mapeadores `toXxx` privados no mesmo arquivo
- Nada de React aqui

## 2. Hook de leitura (`features/<x>/hooks/`)
```ts
import { useCallback, useEffect, useState } from "react";

import { logger } from "@/lib/logger";

import { studentsRepository } from "../api/students.repository";
import type { Student } from "../types/students.types";

/**
 * @description - Carrega os alunos do responsável.
 * @returns `data`, `isLoading`, `error` e `reload`.
 */
export function useStudents(guardianId: string) {
  const [data, setData] = useState<Student[]>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      setData(await studentsRepository.listByGuardian(guardianId));
    } catch (err) {
      logger.error(err, { guardianId });
      setError(err instanceof Error ? err : new Error("Não foi possível carregar"));
    } finally {
      setIsLoading(false);
    }
  }, [guardianId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, error, isLoading, reload };
}
```

## 3. Hook de ação (formulário)
Veja `features/auth/hooks/useSignIn.ts`: valida com função pura de `utils/` **antes** de chamar o repository
e expõe `submit`, `fieldErrors`, `isLoading` e `errorMessage`. Efeitos colaterais (salvar sessão) ficam no hook, nunca na screen.

## 4. Screen
```tsx
const { data, error, isLoading, reload } = useStudents(guardianId);
if (isLoading) return <StateView state="loading" />;
if (error) return <StateView state="error" message={error.message} onRetry={reload} />;
if (!data?.length) return <StateView state="empty" message="Nenhum aluno vinculado" />;
```

## Não faça
- Importar o JSON fora do repository
- Retornar DTO para hooks/screens
- `try/catch` ou mapeamento de dados em screen/component
- Copiar dados de um hook para Context sem que 2+ features precisem
