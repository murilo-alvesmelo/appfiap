# Modelo de dados (JSON → domínio)

## Objetivo
Definir como o `responsaveis.json` vira tipos de domínio em camelCase e em inglês, usados por todas as features.

## Fonte (requisito do teste)
"Utilizar o arquivo JSON disponibilizado, que contém informações de alguns responsáveis."

## Decisão de arquitetura
O JSON é um só e aninhado (responsável → alunos → agenda/boletim), e várias features o consomem.
Por isso, DTOs, tipos de domínio e mappers ficam em um **módulo compartilhado**:

```
src/data/
  responsaveis.json    # fonte única (DTO bruto)
  school.dto.ts        # tipos exatamente como no JSON
  school.types.ts      # tipos de domínio (camelCase, inglês)
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
  cpf: string;            // 11 dígitos, sem máscara
  email: string;
  senha: string;
  primeiroNome: string;
  sobrenome: string;
  alunos: StudentDTO[];
};

type StudentDTO = {
  rm: number;
  turma: string;          // ex.: "7EF"
  periodo: string;        // "Matutino" | "Tarde"
  primeiroNome: string;
  sobrenome: string;
  agenda: DayScheduleDTO[];
  boletim: ReportCardDTO[];
};

type DayScheduleDTO = { dia: string; aulas: LessonDTO[] };      // dia: "2025-03-17"
type LessonDTO = { horario: string; disciplina: string };       // horario: "07:15 - 08:00"

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
};                        // sem senha

type Student = {
  rm: number;
  firstName: string;
  lastName: string;
  fullName: string;
  className: string;      // turma atual
  period: string;
};

type DaySchedule = { date: string; lessons: Lesson[] };          // date: ISO "YYYY-MM-DD"
type Lesson = { time: string; subject: string };  // time: "07:15 - 08:00" (como no JSON)

type ReportCard = { year: number; className: string; terms: Term[] };
type Term = { number: number; isEvaluated: boolean; subjects: SubjectGrade[] };
type SubjectGrade = { name: string; grade: number | null; absences: number | null };
```

A agenda e o boletim **não ficam dentro de `Student`**: são carregados sob demanda pelos repositories de `lessons` e `report-card`, a partir do RM.

## Regras de negócio
1. `id` (number) vira `string`.
2. `fullName = primeiroNome + " " + sobrenome`, com trim nos dois lados.
3. `horario` vira `time` sem transformação: a UI exibe o texto como vem do JSON (ex.: `"07:15 - 08:00"`).
4. `ano` (string) vira `year` (number).
5. `nota`/`faltas` `null` significam **não avaliado**. Continuam `null` no domínio (nunca `0`).
6. `Term.isEvaluated = true` quando **pelo menos uma** disciplina tem `nota` diferente de `null`.
7. Trimestres ordenados por `number`, agenda ordenada por `date` e aulas por `time`.
8. A lista de disciplinas **pode variar entre trimestres**. Exemplo real: no RM 13752, o 1º trimestre de 2025 tem 11 disciplinas (sem "Arte") e o 2º e o 3º têm 12. O mapper não completa nem inventa disciplinas.
9. `senha` nunca sai do repository de `auth`: a comparação acontece lá dentro e o `Guardian` não carrega senha.

## Critérios de aceite
- [x] **CA1** **Dado** o JSON, **quando** é mapeado, **então** nenhum campo em pt-BR/DTO aparece fora de `src/data/` e dos repositories.
- [x] **CA2** `horario: "07:15 - 08:00"` → `{ time: "07:15 - 08:00" }`.
- [x] **CA3** `nota: null, faltas: null` → `{ grade: null, absences: null }`.
- [x] **CA4** Os trimestres 2 e 3 de 2025 têm `isEvaluated: false`, e o 1º, `true`.
- [x] **CA5** O boletim de 2024 do RM 12567 tem os 3 trimestres com `isEvaluated: true`.
- [x] **CA6** `Guardian` não tem propriedade de senha.
- [x] **CA7** Os mappers têm testes unitários em `school.mappers.test.ts`.

## Cenários de erro / vazio
- `alunos: []` → `students: []` (o tratamento de UI está em app-header).
- `agenda: []` / `boletim: []` → lista vazia (o tratamento de UI fica em lessons/report-card).

## Fatos dos dados atuais (para testes)
| Responsável | CPF | Senha | Alunos (RM · turma · período) |
|---|---|---|---|
| Gustavo da Silva | 96929456004 | 123456 | Rafael 12567 · 7EF · Matutino; Joana 12568 · 2EM · Matutino |
| Adelaide Silveira da Costa | 50879567007 | 987654 | Bianca 13752 · 1EF · Tarde |

- A agenda de todos os alunos vai de 2025-03-16 (dom) a 2025-03-22 (sáb). Dom e sáb não têm aulas, e seg a sex têm 6 aulas cada.
- Boletins: todos têm 2025, e só o RM 12567 tem também 2024 (turma 6EF).

## Fora de escopo
- Validar CPF por dígito verificador (o teste pede só a máscara).
- API remota/Firebase.

## Arquivos / camadas envolvidos
`src/data/*` e os repositories de `auth`, `students`, `lessons` e `report-card`.

