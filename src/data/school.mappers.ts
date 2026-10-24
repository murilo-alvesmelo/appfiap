import type {
  DayScheduleDTO,
  GuardianDTO,
  LessonDTO,
  ReportCardDTO,
  StudentDTO,
  SubjectGradeDTO,
  TermDTO,
} from './school.dto';
import type {
  DaySchedule,
  Guardian,
  Lesson,
  ReportCard,
  Student,
  SubjectGrade,
  Term,
} from './school.types';

/**
 * @description Mapeia um responsável do JSON para o domínio, sem a senha.
 * @param dto - Responsável no formato do JSON.
 * @returns `Guardian` com os alunos mapeados.
 */
export function toGuardian(dto: GuardianDTO): Guardian {
  return {
    id: String(dto.id),
    cpf: dto.cpf,
    email: dto.email,
    firstName: dto.primeiroNome.trim(),
    lastName: dto.sobrenome.trim(),
    students: dto.alunos.map(toStudent),
  };
}

/**
 * @description Mapeia um aluno do JSON para o domínio (sem agenda e boletim).
 * @param dto - Aluno no formato do JSON.
 * @returns `Student` com `fullName` montado.
 */
export function toStudent(dto: StudentDTO): Student {
  const firstName = dto.primeiroNome.trim();
  const lastName = dto.sobrenome.trim();
  return {
    rm: dto.rm,
    firstName,
    lastName,
    fullName: [firstName, lastName].filter(Boolean).join(' '),
    className: dto.turma,
    period: dto.periodo,
  };
}

/**
 * @description Mapeia uma aula do JSON, mantendo o horário como texto.
 * @param dto - Aula no formato do JSON.
 * @returns `Lesson`.
 */
export function toLesson(dto: LessonDTO): Lesson {
  return { time: dto.horario, subject: dto.disciplina };
}

/**
 * @description Mapeia a agenda de um dia, com as aulas ordenadas por horário.
 * @param dto - Dia da agenda no formato do JSON.
 * @returns `DaySchedule`.
 */
export function toDaySchedule(dto: DayScheduleDTO): DaySchedule {
  return {
    date: dto.dia,
    lessons: dto.aulas
      .map(toLesson)
      .sort((a, b) => a.time.localeCompare(b.time)),
  };
}

/**
 * @description Mapeia a agenda completa, ordenada por data.
 * @param dtos - Agenda do aluno no formato do JSON.
 * @returns Lista de `DaySchedule` ordenada por `date`.
 */
export function toSchedule(dtos: DayScheduleDTO[]): DaySchedule[] {
  return dtos.map(toDaySchedule).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * @description Mapeia a nota de uma disciplina, preservando `null` (não avaliado).
 * @param dto - Disciplina no formato do JSON.
 * @returns `SubjectGrade`.
 */
export function toSubjectGrade(dto: SubjectGradeDTO): SubjectGrade {
  return { name: dto.nome, grade: dto.nota, absences: dto.faltas };
}

/**
 * @description Mapeia um trimestre. É avaliado quando pelo menos uma disciplina tem nota.
 * @param dto - Trimestre no formato do JSON.
 * @returns `Term`.
 */
export function toTerm(dto: TermDTO): Term {
  const subjects = dto.disciplinas.map(toSubjectGrade);
  return {
    number: dto.trimestre,
    isEvaluated: subjects.some(subject => subject.grade !== null),
    subjects,
  };
}

/**
 * @description Mapeia o boletim de um ano, com os trimestres ordenados.
 * @param dto - Boletim no formato do JSON.
 * @returns `ReportCard`.
 */
export function toReportCard(dto: ReportCardDTO): ReportCard {
  return {
    year: Number(dto.ano),
    className: dto.turma,
    terms: dto.trimestres.map(toTerm).sort((a, b) => a.number - b.number),
  };
}
