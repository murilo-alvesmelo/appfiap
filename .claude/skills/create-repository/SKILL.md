---
name: create-repository
description: Adiciona um novo dado/consulta a uma feature a partir da fonte local (JSON), criando DTO e tipo de domínio, método no repository com mapeamento e o hook que expõe data/isLoading/error (ou submit para ações). Use quando pedirem para ler/consultar/integrar um dado novo.
---

# Novo dado (repository + hook)

Leia antes: `docs/data-fetching.md`.

## Passos

1. **Tipos** em `features/<x>/types/<x>.types.ts`:
   - `XxxDTO`: exatamente como está no JSON
   - Tipo de domínio em camelCase, com tipos ricos quando fizer sentido
   - Tipo de input para ações (ex.: `SignInCredentials`)

2. **Repository** em `features/<x>/api/<x>.repository.ts`: adicione o método async no objeto existente:

   ```ts
   async getReportCard(studentId: string, year: number): Promise<ReportCard> {
     const dto = reportCards.find((item) => item.student_id === studentId && item.year === year);
     if (!dto) throw new Error("Boletim não encontrado");
     return toReportCard(dto);
   },
   ```

   Mapeadores (`toXxx`) privados no mesmo arquivo. Só o repository importa o JSON.

3. **Hook** em `features/<x>/hooks/` (um por caso de uso):
   - Leitura: `useState` para `data`/`error`/`isLoading` + `reload` com `useCallback` + `useEffect` (modelo em `docs/data-fetching.md`, seção 2)
   - Ação/formulário: função pura de validação em `utils/` rodada antes do repository, exposta como `submit` (ver `useSignIn`)
   - Erros: `logger.error` + expor `error`/`errorMessage` com mensagem em pt-BR

4. **Exports**: exponha no `index.ts` só o que outra feature precisa.

5. **JSDoc**: método do repository e hook com **JSDoc em pt-BR** (ver `docs/conventions.md`).

6. `yarn typecheck`.

## Não faça

- Importar o JSON fora do repository
- Retornar DTO para hooks/screens
- `try/catch`/mapeamento em screen ou component
- Copiar `data` para Context sem que 2+ features precisem
- Deixar função exportada sem JSDoc em pt-BR
