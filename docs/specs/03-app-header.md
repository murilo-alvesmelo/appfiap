# Shell autenticado (header + bottom tabs)

## Objetivo
Dar contexto fixo em toda a área logada (quem é o responsável, qual aluno está selecionado) e a navegação entre **Aulas** e **Boletim**.

## Fonte (requisito do teste)
Em todas as telas autenticadas, exibir um cabeçalho com:
- o primeiro nome do responsável;
- o primeiro nome, o RM, a turma e o período do aluno selecionado;
- um botão de acesso à seleção de aluno, se houver mais de um aluno vinculado;
- um botão de logout.

Incluir, no rodapé, a navegação entre **aulas** e **boletim**.

## Regras de negócio
1. O aluno selecionado vive em um provider global (`src/providers/`), porque `lessons`, `report-card` e `students` o usam.
2. Após o login, o **primeiro aluno** de `students` é selecionado automaticamente.
3. O aluno selecionado é persistido junto da sessão. Na restauração, se o RM salvo não pertencer mais ao responsável, o app volta para o primeiro aluno.
4. O botão de troca de aluno aparece **somente** quando `students.length > 1`.
5. Logout: limpa a sessão e o aluno selecionado, e a navegação volta ao login sozinha.
6. O header visual (`AppHeader`) recebe os dados por props. Um container (`AuthenticatedHeader`) lê os providers e é registrado como `header` das tabs, então aparece em todas elas.
7. As tabs são **Agenda** (rota `Lessons`, inicial) e **Boletim** (rota `ReportCard`).
8. O Botão **"SAIR"** fica no canto superior direito, no mesmo estilo de "TROCAR PERFIL".


## Critérios de aceite
- [x] **CA1** **Dado** que entrei como Gustavo, **então** o header mostra "Olá, GUSTAVO".
- [x] **CA2** **Dado** Rafael selecionado, **então** o header mostra "RAFAEL" e "7EF - RM 12567 - Matutino".
- [ ] **CA3** **Dado** Gustavo (2 alunos), **então** "TROCAR PERFIL" aparece e abre a seleção.
- [x] **CA4** **Dado** Adelaide (1 aluna), **então** "TROCAR PERFIL" **não** aparece.
- [x] **CA5** **Quando** toco em "SAIR", **então** volto ao login, e ao reabrir o app continuo no login.
- [x] **CA6** O header aparece em **Agenda** e em **Boletim**.
- [x] **CA7** O rodapé tem as tabs **Agenda** e **Boletim**, e **Agenda** é a inicial.
- [ ] **CA8** **Quando** troco de aluno, **então** o header, Agenda e Boletim refletem o novo aluno.

## Cenários de erro / vazio
- **Responsável sem alunos**: o app não quebra. Mostra um `StateView` vazio ("Nenhum aluno vinculado a este responsável") com o botão de logout disponível. O header exibe só o nome do responsável.


## Fora de escopo
- Mais tabs além de Aulas e Boletim.
- Edição de perfil.

## Arquivos / camadas envolvidos
- `src/providers/selected-student/` (novo): aluno selecionado + ação `selectStudent`.
- `src/providers/session/`: responsável logado (`Guardian`).
- `src/components/layout/`: `AppHeader.tsx` (props), `AuthenticatedHeader.tsx` (container que lê os providers), `formatStudentDetails.ts`.
- `src/navigation/AppTabs.tsx`, `navigation.types.ts`.

