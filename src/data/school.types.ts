/**
 * Tipos de domínio (camelCase, inglês). Podem ser importados por qualquer camada.
 */

/** Responsável autenticável. Nunca carrega a senha. */
export type Guardian = {
  id: string;
  cpf: string;
  email: string;
  firstName: string;
  lastName: string;
  students: Student[];
};

/** Aluno vinculado a um responsável (agenda e boletim são carregados à parte, pelo RM). */
export type Student = {
  rm: number;
  firstName: string;
  lastName: string;
  fullName: string;
  /** Turma atual. */
  className: string;
  period: string;
};

export type DaySchedule = {
  date: string;
  lessons: Lesson[];
};

export type Lesson = {
  /** Horário como vem do JSON, ex.: `"07:15 - 08:00"`. */
  time: string;
  subject: string;
};

export type ReportCard = {
  year: number;
  className: string;
  terms: Term[];
};

export type Term = {
  number: number;
  isEvaluated: boolean;
  subjects: SubjectGrade[];
};

export type SubjectGrade = {
  name: string;
  grade: number | null;
  absences: number | null;
};
