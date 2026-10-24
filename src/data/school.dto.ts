/**
 * DTOs exatamente no formato de `responsaveis.json`.
 * Só repositories (`features/<x>/api/`) importam este arquivo.
 */

export type GuardianDTO = {
  id: number;
  /** 11 dígitos, sem máscara. */
  cpf: string;
  email: string;
  senha: string;
  primeiroNome: string;
  sobrenome: string;
  alunos: StudentDTO[];
};

export type StudentDTO = {
  rm: number;
  /** Ex.: `"7EF"`. */
  turma: string;
  /** Ex.: `"Matutino"`, `"Tarde"`. */
  periodo: string;
  primeiroNome: string;
  sobrenome: string;
  agenda: DayScheduleDTO[];
  boletim: ReportCardDTO[];
};

export type DayScheduleDTO = {
  /** Data ISO, ex.: `"2025-03-17"`. */
  dia: string;
  aulas: LessonDTO[];
};

export type LessonDTO = {
  /** Ex.: `"07:15 - 08:00"`. */
  horario: string;
  disciplina: string;
};

export type ReportCardDTO = {
  /** Ex.: `"2025"`. */
  ano: string;
  turma: string;
  trimestres: TermDTO[];
};

export type TermDTO = {
  trimestre: number;
  disciplinas: SubjectGradeDTO[];
};

export type SubjectGradeDTO = {
  nome: string;
  /** `null` = não avaliado. */
  nota: number | null;
  /** `null` = não avaliado. */
  faltas: number | null;
};
