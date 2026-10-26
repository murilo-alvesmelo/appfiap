# Aulas

## Objetivo
Mostrar as aulas de um dia do aluno selecionado e permitir navegar entre os dias da semana.

## Fonte (requisito do teste)
- Ao acessar a tela, exibir as aulas de um dia, com horário (como vem do JSON, ex.: `07:15 - 08:00`) e disciplina.
- Permitir a navegação entre os dias da semana.

## Regras de negócio
1. A agenda vem do repository de `lessons`, pelo RM do aluno selecionado.
2. O seletor de dia é um **dropdown** (fundo `surface`, chevron `primary`). Ele mostra o dia ativo e, aberto, lista os dias da agenda do aluno em ordem de data (hoje: 16 a 22/03/2025, dom a sáb).
3. **Dia inicial:** a data de hoje, se ela existir na agenda. Se não existir, o **primeiro dia com aulas** da agenda (com os dados atuais, segunda-feira 17/03/2025). Essa regra é uma função pura testada.
4. Cada aula mostra `time` (pequeno) e `subject` (negrito), em ordem de `time`, numa timeline com marcador circular.
5. Rótulo do dia em pt-BR: `"17 de março, segunda-feira"`, com formatação em uma função pura de `utils/`.
6. Ao trocar de aluno, a agenda recarrega e o dia inicial é recalculado.
7. Acima do seletor, o título de seção "AGENDA" em `primary`, negrito e centralizado.

## Critérios de aceite
- [x] **CA1** **Dado** Rafael e a data de hoje fora da agenda, **quando** abro Aulas, **então** o dropdown mostra "17 de março, segunda-feira" e vejo 6 aulas, a primeira sendo "07:15 - 08:00" / "Matemática I".
- [x] **CA2** Cada item mostra o horário (início e término, como vem do JSON) e a disciplina.
- [x] **CA3** **Quando** abro o dropdown e escolho outro dia, **então** ele fecha, mostra o dia escolhido e a lista passa a ter as aulas desse dia.
- [x] **CA4** **Dado** domingo 16/03 ou sábado 22/03, **então** vejo a ilustração(componente svg NoClassRoom) e o texto "Sem aulas neste dia".
- [x] **CA5** **Quando** troco de aluno, **então** a agenda passa a ser a do novo aluno.
- [x] **CA6** Enquanto carrega, vejo `StateView` loading. Se houver erro, `StateView` com erro e "tentar novamente".
- [x] **CA7** A regra do dia inicial e a formatação do rótulo têm testes unitários.

## Cenários de erro / vazio
- **Aluno sem agenda** (`agenda: []`): `StateView` vazio "Agenda indisponível para este aluno", sem seletor de dias.
- Dia sem aulas: ilustração + "Sem aulas neste dia" no lugar da lista. O dropdown continua navegável.

## Animações
Ver [animations.md](./animations.md#aulas): troca de dia animada e entrada da lista em sequência (stagger).

## Fora de escopo
- Calendário mensal, semanas anteriores/próximas (os dados só têm uma semana).
- Detalhe da aula (professor, sala).

## Arquivos / camadas envolvidos
`src/features/lessons/` (`api/lessons.repository.ts`, `hooks/useLessons.ts`, `utils/` com o dia inicial e o rótulo, `components/` com o dropdown de dias e o item de aula, `screens/LessonsScreen.tsx`), e o provider de aluno selecionado.

