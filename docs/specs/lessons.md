# Aulas

## Objetivo
Mostrar as aulas de um dia do aluno selecionado e permitir navegar entre os dias da semana.

## Fonte (requisito do teste)
- Ao acessar a tela, exibir as aulas de um dia, com horário de início, horário de término e disciplina.
- Permitir a navegação entre os dias da semana.

## Regras de negócio
1. A agenda vem do repository de `lessons`, pelo RM do aluno selecionado.
2. Os dias exibidos no seletor são os da agenda do aluno, em ordem de data (hoje: 16 a 22/03/2025, dom a sáb).
3. **Dia inicial:** a data de hoje, se ela existir na agenda. Se não existir, o **primeiro dia com aulas** da agenda (com os dados atuais, segunda-feira 17/03/2025). Essa regra é uma função pura testada.
4. Cada aula mostra `startTime`, `endTime` e `subject`, em ordem de `startTime`.
5. Rótulo do dia em pt-BR (ex.: "Seg 17"), com formatação em uma função pura de `utils/`.
6. Ao trocar de aluno, a agenda recarrega e o dia inicial é recalculado.

## Critérios de aceite
- [ ] **CA1** **Dado** Rafael e a data de hoje fora da agenda, **quando** abro Aulas, **então** vejo segunda 17/03 com 6 aulas, a primeira sendo "07:15 – 08:00 · Matemática I".
- [ ] **CA2** Cada item mostra início, término e disciplina.
- [ ] **CA3** **Quando** toco em outro dia no seletor, **então** a lista mostra as aulas desse dia, e o dia ativo fica destacado.
- [ ] **CA4** **Dado** domingo 16/03 ou sábado 22/03, **então** vejo o estado vazio "Nenhuma aula neste dia".
- [ ] **CA5** **Quando** troco de aluno, **então** a agenda passa a ser a do novo aluno.
- [ ] **CA6** Enquanto carrega, vejo `StateView` loading. Se houver erro, `StateView` com erro e "tentar novamente".
- [ ] **CA7** A regra do dia inicial e a formatação do rótulo têm testes unitários.

## Cenários de erro / vazio
- **Aluno sem agenda** (`agenda: []`): `StateView` vazio "Agenda indisponível para este aluno", sem seletor de dias.
- Dia sem aulas: estado vazio só na lista. O seletor continua navegável.

## Animações
Ver [animations.md](./animations.md#aulas): troca de dia animada e entrada da lista em sequência (stagger).

## Fora de escopo
- Calendário mensal, semanas anteriores/próximas (os dados só têm uma semana).
- Detalhe da aula (professor, sala).

## Arquivos / camadas envolvidos
`src/features/lessons/` (`api/lessons.repository.ts`, `hooks/useLessons.ts`, `utils/` com o dia inicial e o rótulo, `components/` com o seletor de dias e o item de aula, `screens/LessonsScreen.tsx`), e o provider de aluno selecionado.

## Referência do Figma
Tela de aulas: node-id a extrair.
