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
3. ⭐ O aluno selecionado é persistido junto da sessão. Na restauração, se o RM salvo não pertencer mais ao responsável, o app volta para o primeiro aluno.
4. O botão de troca de aluno aparece **somente** quando `students.length > 1`.
5. Logout: limpa a sessão e o aluno selecionado, e a navegação volta ao login sozinha.
6. O header é um componente do app (`headerShown: false` nos navigators). Ele recebe os dados por props e não lê dados por conta própria.
7. As tabs são **Aulas** (rota `Lessons`, inicial) e **Boletim** (rota `ReportCard`). A feature `home` de exemplo é removida.

## Critérios de aceite
- [ ] **CA1** **Dado** que entrei como Gustavo, **então** o header mostra "Gustavo".
- [ ] **CA2** **Dado** Rafael selecionado, **então** o header mostra "Rafael", "RM 12567", "7EF" e "Matutino".
- [ ] **CA3** **Dado** Gustavo (2 alunos), **então** o botão de troca de aluno aparece e abre a seleção.
- [ ] **CA4** **Dado** Adelaide (1 aluna), **então** o botão de troca **não** aparece.
- [ ] **CA5** **Quando** toco em logout, **então** volto ao login, e ao reabrir o app continuo no login.
- [ ] **CA6** O header aparece em **Aulas** e em **Boletim**.
- [ ] **CA7** O rodapé tem as tabs **Aulas** e **Boletim**, com ícones e cores do Figma, e **Aulas** é a inicial.
- [ ] **CA8** **Quando** troco de aluno, **então** o header, Aulas e Boletim refletem o novo aluno.

## Cenários de erro / vazio
- **Responsável sem alunos**: o app não quebra. Mostra um `StateView` vazio ("Nenhum aluno vinculado a este responsável") com o botão de logout disponível. O header exibe só o nome do responsável.

## Animações
Ver [animations.md](./animations.md#header): transição dos dados do aluno ao trocar e transição entre as tabs.

## Fora de escopo
- Mais tabs além de Aulas e Boletim.
- Edição de perfil.

## Arquivos / camadas envolvidos
- `src/providers/selected-student/` (novo): aluno selecionado + ação `selectStudent`.
- `src/providers/session/`: responsável logado (`Guardian`).
- `src/components/` ou uma feature para o header: ele usa só tipos de `@/data/school.types` e props.
- `src/navigation/AppTabs.tsx`, `navigation.types.ts`.

## Referência do Figma
Header e tab bar: node-id a extrair.
