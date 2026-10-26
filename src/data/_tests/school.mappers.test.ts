import guardiansData from '../responsaveis.json';
import type { GuardianDTO, StudentDTO } from '../school.dto';
import {
  toDaySchedule,
  toGuardian,
  toReportCard,
  toSchedule,
  toStudent,
  toSubjectGrade,
  toTerm,
} from '../school.mappers';

const guardians: GuardianDTO[] = guardiansData;

function findGuardian(id: number): GuardianDTO {
  const guardian = guardians.find(item => item.id === id);
  if (!guardian) throw new Error(`Responsável ${id} não encontrado no JSON`);
  return guardian;
}

function findStudent(rm: number): StudentDTO {
  const student = guardians
    .flatMap(guardian => guardian.alunos)
    .find(item => item.rm === rm);
  if (!student) throw new Error(`RM ${rm} não encontrado no JSON`);
  return student;
}

function findReportCard(rm: number, year: string) {
  const reportCard = findStudent(rm).boletim.find(item => item.ano === year);
  if (!reportCard)
    throw new Error(`Boletim ${year} do RM ${rm} não encontrado`);
  return toReportCard(reportCard);
}

describe('toGuardian', () => {
  const guardian = toGuardian(findGuardian(1));

  it('converte o id para string e mapeia os campos', () => {
    expect(guardian).toMatchObject({
      id: '1',
      cpf: '96929456004',
      firstName: 'Gustavo',
      lastName: 'da Silva',
    });
  });

  it('não expõe a senha', () => {
    expect(guardian).not.toHaveProperty('senha');
    expect(guardian).not.toHaveProperty('password');
  });

  it('mapeia os alunos sem agenda e boletim', () => {
    expect(guardian.students.map(student => student.rm)).toEqual([
      12567, 12568,
    ]);
    expect(guardian.students[0]).not.toHaveProperty('agenda');
    expect(guardian.students[0]).not.toHaveProperty('boletim');
  });

  it('mapeia responsável sem alunos para lista vazia', () => {
    const dto: GuardianDTO = { ...findGuardian(1), alunos: [] };
    expect(toGuardian(dto).students).toEqual([]);
  });
});

describe('toStudent', () => {
  it('monta o fullName com trim', () => {
    const dto: StudentDTO = {
      ...findStudent(12567),
      primeiroNome: '  Rafael ',
      sobrenome: ' da Silva  ',
    };
    expect(toStudent(dto)).toEqual({
      rm: 12567,
      firstName: 'Rafael',
      lastName: 'da Silva',
      fullName: 'Rafael da Silva',
      className: '7EF',
      period: 'Matutino',
    });
  });
});

describe('toDaySchedule / toSchedule', () => {
  it('ordena as aulas por horário', () => {
    const day = toDaySchedule({
      dia: '2025-03-17',
      aulas: [
        { horario: '08:00 - 08:45', disciplina: 'B' },
        { horario: '07:15 - 08:00', disciplina: 'A' },
      ],
    });
    expect(day.lessons.map(lesson => lesson.subject)).toEqual(['A', 'B']);
  });

  it('ordena a agenda por data e mantém dias sem aulas', () => {
    const schedule = toSchedule([
      { dia: '2025-03-18', aulas: [] },
      { dia: '2025-03-16', aulas: [] },
    ]);
    expect(schedule).toEqual([
      { date: '2025-03-16', lessons: [] },
      { date: '2025-03-18', lessons: [] },
    ]);
  });

  it('mapeia a agenda real: dom/sáb sem aulas, seg–sex com 6', () => {
    const schedule = toSchedule(findStudent(12567).agenda);
    expect(schedule.map(day => day.lessons.length)).toEqual([
      0, 6, 6, 6, 6, 6, 0,
    ]);
    expect(schedule[1]?.lessons[0]).toEqual({
      time: '07:15 - 08:00',
      subject: 'Matemática I',
    });
  });

  it('agenda vazia vira lista vazia', () => {
    expect(toSchedule([])).toEqual([]);
  });
});

describe('toSubjectGrade / toTerm', () => {
  it('preserva nota e faltas nulas', () => {
    expect(toSubjectGrade({ nome: 'Arte', nota: null, faltas: null })).toEqual({
      name: 'Arte',
      grade: null,
      absences: null,
    });
  });

  it('é avaliado quando pelo menos uma disciplina tem nota', () => {
    const term = toTerm({
      trimestre: 1,
      disciplinas: [
        { nome: 'A', nota: null, faltas: null },
        { nome: 'B', nota: 7, faltas: 0 },
      ],
    });
    expect(term.isEvaluated).toBe(true);
  });

  it('não é avaliado quando todas as notas são nulas', () => {
    const term = toTerm({
      trimestre: 2,
      disciplinas: [{ nome: 'A', nota: null, faltas: null }],
    });
    expect(term.isEvaluated).toBe(false);
  });
});

describe('toReportCard', () => {
  it('converte o ano para number e ordena os trimestres', () => {
    const reportCard = toReportCard({
      ano: '2025',
      turma: '7EF',
      trimestres: [
        { trimestre: 3, disciplinas: [] },
        { trimestre: 1, disciplinas: [] },
        { trimestre: 2, disciplinas: [] },
      ],
    });
    expect(reportCard.year).toBe(2025);
    expect(reportCard.terms.map(term => term.number)).toEqual([1, 2, 3]);
  });

  it.each([12567, 12568, 13752])(
    '2025 do RM %p: só o 1º trimestre avaliado',
    rm => {
      const reportCard = findReportCard(rm, '2025');
      expect(reportCard.terms.map(term => term.isEvaluated)).toEqual([
        true,
        false,
        false,
      ]);
    },
  );

  it('2024 do RM 12567 tem os 3 trimestres avaliados', () => {
    const reportCard = findReportCard(12567, '2024');
    expect(reportCard.className).toBe('6EF');
    expect(reportCard.terms.every(term => term.isEvaluated)).toBe(true);
  });

  it('não inventa disciplinas: RM 13752 tem 11 no 1º e 12 no 2º trimestre', () => {
    const reportCard = findReportCard(13752, '2025');
    expect(reportCard.terms.map(term => term.subjects.length)).toEqual([
      11, 12, 12,
    ]);
  });
});
