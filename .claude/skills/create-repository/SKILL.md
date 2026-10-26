---
name: create-repository
description: Adiciona um novo dado/consulta a uma feature a partir da fonte local (JSON), criando DTO, tipo de domínio e mapper em src/data/, método no repository e o hook que expõe data/isLoading/error (ou submit para ações). Use quando pedirem para ler/consultar/integrar um dado novo.
---

# Novo dado (repository + hook)

Leia antes: `docs/data-fetching.md`, `docs/specs/01-data-model.md` e a spec do fluxo em `docs/specs/`.

## Passos

1. **Tipos**: o dado vem de `src/data/responsaveis.json`, então DTO e domínio ficam no módulo compartilhado:
   - `src/data/school.dto.ts`: `XxxDTO`, exatamente como está no JSON (se ainda não existir)
   - `src/data/school.types.ts`: tipo de domínio em camelCase e em inglês, com tipos ricos quando fizer sentido
   - `features/<x>/types/<x>.types.ts`: só tipos **próprios da feature** (ex.: input de ação como `SignInCredentials`, erros de campo)

2. **Mapper** puro em `src/data/school.mappers.ts` (`toXxx`), com teste em `school.mappers.test.ts`.
   Siga as regras de `docs/specs/01-data-model.md` (`null` = não avaliado, `horario` → `time` sem transformação etc.).

3. **Repository** em `features/<x>/api/<x>.repository.ts`: adicione o método async no objeto existente:

   ```ts
   import guardiansData from "@/data/responsaveis.json";
   import type { GuardianDTO } from "@/data/school.dto";
   import { toReportCard } from "@/data/school.mappers";
   import type { ReportCard } from "@/data/school.types";

   const guardians: GuardianDTO[] = guardiansData;

   export const reportCardRepository = {
     /** @description - Busca o boletim de um aluno em um ano. */
     async getReportCard(rm: number, year: number): Promise<ReportCard> {
       const student = guardians.flatMap((item) => item.alunos).find((item) => item.rm === rm);
       const dto = student?.boletim.find((item) => Number(item.ano) === year);
       if (!dto) throw new Error("Boletim não encontrado");
       return toReportCard(dto);
     },
   };
   ```

   Só repositories importam o JSON, `school.dto.ts` e `school.mappers.ts`. Mapeadores usados por uma feature só podem ficar privados no repository.

4. **Hook** em `features/<x>/hooks/` (um por caso de uso):
   - Leitura: `useState` para `data`/`error`/`isLoading` + `reload` com `useCallback` + `useEffect` (modelo em `docs/data-fetching.md`, seção 2)
   - Ação/formulário: função pura de validação em `utils/` rodada antes do repository, exposta como `submit` (ver `useSignIn`)
   - Erros: `logger.error` + expor `error`/`errorMessage` com mensagem em pt-BR

5. **Exports**: exponha no `index.ts` só o que outra feature precisa.

6. **JSDoc**: método do repository e hook com **JSDoc em pt-BR** (ver `docs/conventions.md`).

7. `yarn typecheck` e `yarn test`.

## Não faça

- Importar o JSON, `school.dto.ts` ou `school.mappers.ts` fora de um repository
- Declarar DTO do `responsaveis.json` dentro de `features/<x>/types/`
- Criar mapper compartilhado sem teste
- Retornar DTO para hooks/screens
- `try/catch`/mapeamento em screen ou component
- Copiar `data` para Context sem que 2+ features precisem
- Deixar função exportada sem JSDoc em pt-BR
