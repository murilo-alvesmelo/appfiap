# Boletim

## Objetivo
Mostrar o boletim anual do aluno selecionado: trimestres, disciplinas, notas e faltas.

## Fonte (requisito do teste)
- Ao acessar, exibir o boletim de **2025**, considerando apenas o 1º trimestre como avaliado.
- Apresentar o ano, a turma e os trimestres, com as disciplinas, notas gerais e faltas.
- **Bônus:** navegar entre anos anteriores, quando houver dados.

## Regras de negócio
1. O boletim vem do repository de `report-card`, pelo RM e pelo ano.
2. Ano inicial: **2025**. Se o aluno não tiver 2025, abrir no ano mais recente disponível.
3. A turma exibida é a **do boletim** daquele ano (ex.: Rafael em 2024 = 6EF, em 2025 = 7EF), e não a turma atual do aluno.
4. Trimestre avaliado: `isEvaluated` (ver [data-model.md](./data-model.md#regras-de-negócio)). Trimestres não avaliados mostram o estado **"Não avaliado"** em vez de notas.
5. Uma disciplina com `grade: null` dentro de um trimestre avaliado mostra "–" (nunca `0`).
6. Cada trimestre mostra **as disciplinas que ele tem**. A lista pode variar entre trimestres (RM 13752: o 1º tem 11 disciplinas, sem "Arte").
7. Nota exibida com uma casa decimal e vírgula (`9,5`, `8,0`), formatada por função pura.
8. ⭐ Seletor de ano visível só quando há mais de um ano. Anos em ordem decrescente.
9. Ao trocar de aluno, o boletim recarrega no ano inicial.

## Critérios de aceite
- [x] **CA1** **Dado** Rafael, **quando** abro Boletim, **então** vejo "2025" e a turma "7EF".
- [x] **CA2** O 1º trimestre lista as 12 disciplinas com nota e faltas (ex.: Língua Portuguesa · 9,5 · 0 faltas).
- [x] **CA3** Notas e faltas aparecem por disciplina, em cada trimestre avaliado.
- [x] **CA4** O 2º e o 3º trimestres de 2025 aparecem como "Não avaliado".
- [x] **CA5** **Dado** Bianca (RM 13752), **então** o 1º trimestre mostra 11 disciplinas, sem crash nem linha vazia.
- [x] **CA6** ⭐ **Dado** Rafael, **quando** escolho 2024, **então** vejo a turma "6EF" e os 3 trimestres avaliados.
- [x] **CA7** ⭐ **Dado** Joana ou Bianca (só 2025), **então** o seletor de ano não aparece.
- [x] **CA8** **Quando** troco de aluno, **então** o boletim passa a ser o do novo aluno, em 2025.
- [x] **CA9** Loading e erro via `StateView`.
- [x] **CA10** O mapeamento, `isEvaluated`, a formatação de nota e a escolha do ano inicial têm testes.

## Cenários de erro / vazio
- **Aluno sem boletim** (`boletim: []`): `StateView` vazio "Boletim indisponível para este aluno".
- Ano pedido que não existe: o repository lança `Error("Boletim não encontrado")`, e o hook expõe o erro.

## Animações
Ver [animations.md](./animations.md#boletim): troca de ano/trimestre e entrada dos itens.

## Fora de escopo
- Média anual calculada, frequência percentual, exportar PDF.

## Arquivos / camadas envolvidos
`src/features/report-card/` (`api/report-card.repository.ts`, `hooks/useReportCard.ts`, `utils/` com formatação e ano inicial, `components/` com o trimestre, a linha de disciplina e o seletor de ano, `screens/ReportCardScreen.tsx`), e o provider de aluno selecionado.

