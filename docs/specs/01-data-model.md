# Modelo de dados (JSON → domínio)

## Objetivo
Definir como o `responsaveis.json` vira tipos de domínio em camelCase e em inglês, usados por todas as features.


## Decisão de arquitetura
O JSON é um só e aninhado (responsável → alunos → agenda/boletim), e várias features o consomem.
Por isso, DTOs, tipos de domínio e mappers ficam em um **módulo compartilhado**:

```
src/data/
  responsaveis.json    # fonte única (DTO bruto)
  school.dto.ts        # tipos exatamente como no JSON
  school.types.ts      # tipos de domínio
  school.mappers.ts    # funções puras DTO → domínio
  school.mappers.test.ts
```

Quem pode importar o quê:

| Arquivo | Pode importar |
|---|---|
| `responsaveis.json`, `school.dto.ts`, `school.mappers.ts` | **só** repositories (`features/<x>/api/`) |
| `school.types.ts` | qualquer camada (features, providers, navigation) |

`src/data/` não importa React, React Native nem `features/`.

## Formato do JSON (DTO)

```ts
type GuardianDTO = {
  id: number;
  cpf: string;          
  email: string;
  senha: string;
  primeiroNome: string;
  sobrenome: string;
  alunos: StudentDTO[];
};

type StudentDTO = {
  rm: number;
  turma: string;          
  periodo: string;       
  primeiroNome: string;
  sobrenome: string;
  agenda: DayScheduleDTO[];
  boletim: ReportCardDTO[];
};

type DayScheduleDTO = { dia: string; aulas: LessonDTO[] };     
type LessonDTO = { horario: string; disciplina: string };

type ReportCardDTO = { ano: string; turma: string; trimestres: TermDTO[] };
type TermDTO = { trimestre: number; disciplinas: SubjectGradeDTO[] };
type SubjectGradeDTO = { nome: string; nota: number | null; faltas: number | null };
```

## Domínio

```ts
type Guardian = {
  id: string;
  cpf: string;
  email: string;
  firstName: string;
  lastName: string;
  students: Student[];
};                       

type Student = {
  rm: number;
  firstName: string;
  lastName: string;
  fullName: string;
  className: string;     
  period: string;
};

type DaySchedule = { date: string; lessons: Lesson[] };          
type Lesson = { time: string; subject: string }; 

type ReportCard = { year: number; className: string; terms: Term[] };
type Term = { number: number; isEvaluated: boolean; subjects: SubjectGrade[] };
type SubjectGrade = { name: string; grade: number | null; absences: number | null };
```

A agenda e o boletim **não ficam dentro de `Student`**: são carregados sob demanda pelos repositories de `lessons` e `report-card`, a partir do RM.

## Premissas sobre a fonte
A fonte hoje é um JSON fixo, mas as regras valem para qualquer dado no formato acima (ex.: uma API). **Não** se supõe que:
- a quantidade de alunos, dias da agenda, aulas por dia, trimestres ou disciplinas seja fixa (cada lista pode ter de 0 a N itens);
- a agenda seja de uma semana, comece no domingo ou não tenha aulas no fim de semana;
- exista boletim do ano corrente, ou que os anos sejam consecutivos;
- `turma`, `periodo`, `disciplina` e `horario` tenham valores de uma lista conhecida. São texto livre e a UI exibe como vem.

## Regras de negócio
1. `id` (number) vira `string`.
2. `fullName = primeiroNome + " " + sobrenome`, com trim nos dois lados.
3. `horario` vira `time` sem transformação: a UI exibe o texto como vem da fonte.
4. `ano` (string) vira `year` (number).
5. `nota`/`faltas` `null` significam **não avaliado**. Continuam `null` no domínio (nunca `0`).
6. `Term.isEvaluated = true` quando **pelo menos uma** disciplina tem `nota` diferente de `null`.
7. Trimestres ordenados por `number`, agenda ordenada por `date` e aulas por `time`.
8. A lista de disciplinas **pode variar entre trimestres** (quantidade e nomes). O mapper não completa nem inventa disciplinas.
9. `senha` nunca sai do repository de `auth`: a comparação acontece lá dentro e o `Guardian` não carrega senha.

## Critérios de aceite
- [x] **CA1** **Dado** o JSON, **quando** é mapeado, **então** nenhum campo em pt-BR/DTO aparece fora de `src/data/` e dos repositories.
- [x] **CA2** **Dado** um `horario` qualquer, **então** `time` tem exatamente o mesmo texto (ex.: `"07:15 - 08:00"` → `{ time: "07:15 - 08:00" }`).
- [x] **CA3** `nota: null, faltas: null` → `{ grade: null, absences: null }`.
- [x] **CA4** **Dado** um trimestre em que todas as notas são `null`, **então** `isEvaluated: false`.
- [x] **CA5** **Dado** um trimestre com pelo menos uma nota diferente de `null`, **então** `isEvaluated: true`.
- [x] **CA6** `Guardian` não tem propriedade de senha.
- [x] **CA7** Os mappers têm testes unitários em `school.mappers.test.ts`.

## Cenários de erro / vazio
- `alunos: []` → `students: []` (o tratamento de UI está em app-header).
- `agenda: []` / `boletim: []` → lista vazia (o tratamento de UI fica em lessons/report-card).
- `trimestres: []` / `disciplinas: []` / `aulas: []` → lista vazia, sem erro.

## Fora de escopo
- Validar CPF por dígito verificador (o teste pede só a máscara).
- API remota/Firebase.

## Arquivos / camadas envolvidos
`src/data/*` e os repositories de `auth`, `students`, `lessons` e `report-card`.

