# Boletim

## Objetivo
Mostrar o boletim anual do aluno selecionado: trimestres, disciplinas, notas e faltas.

## Fonte (requisito do teste)
- Ao acessar, exibir o boletim de **2025**, considerando apenas o 1º trimestre como avaliado.
- Apresentar o ano, a turma e os trimestres, com as disciplinas, notas gerais e faltas.
- **Bônus:** navegar entre anos anteriores, quando houver dados.

> O requisito cita 2025 e "só o 1º trimestre avaliado" porque são os dados do JSON entregue. A implementação não fixa o ano nem quais trimestres estão avaliados: isso vem dos dados (regras 2 e 4).

## Regras de negócio
1. O boletim vem do repository de `report-card`, pelo RM e pelo ano.
2. Ano inicial: o **ano corrente** (data do dispositivo), se existir no boletim do aluno. Se não existir, o **ano mais recente disponível**. Essa regra é uma função pura testada.
3. A turma exibida é a **do boletim** daquele ano, e não a turma atual do aluno (as duas podem ser diferentes).
4. Trimestre avaliado: `isEvaluated` (ver [01-data-model.md](./01-data-model.md#regras-de-negócio)). Trimestres não avaliados listam as disciplinas normalmente, com nota e faltas "–".
5. Uma disciplina com `grade`/`absences` `null` mostra "–", em qualquer trimestre.
6. Cada trimestre mostra **as disciplinas que ele tem**. A quantidade e os nomes podem variar entre trimestres.
7. Nota exibida com uma casa decimal e vírgula (ex.: `9,5`, `8,0`), formatada por função pura.
8. Seletor de ano visível só quando há mais de um ano. Anos em ordem decrescente.
9. Ao trocar de aluno, o boletim recarrega no ano inicial.
10. A quantidade de trimestres não é fixa: a tela mostra os que vierem da fonte, em ordem.

## Critérios de aceite
- [x] **CA1** **Dado** um aluno com boletim, **quando** abro Boletim, **então** vejo o ano inicial (regra 2) e a turma daquele boletim.
- [x] **CA2** **Dado** um trimestre avaliado, **então** ele lista todas as suas disciplinas com nota e faltas (ex.: `Língua Portuguesa · 9,5 · 0 faltas`).
- [x] **CA3** Notas e faltas aparecem por disciplina, em cada trimestre avaliado.
- [x] **CA4** **Dado** um trimestre não avaliado, **então** ele lista as disciplinas com nota e faltas "–".
- [x] **CA5** **Dado** trimestres com quantidades diferentes de disciplinas, **então** cada um mostra só as suas, sem crash nem linha vazia.
- [x] **CA6** **Dado** um aluno com boletim de mais de um ano, **quando** escolho outro ano, **então** vejo a turma e os trimestres daquele ano.
- [x] **CA7** **Dado** um aluno com boletim de um ano só, **então** o seletor de ano não aparece.
- [x] **CA8** **Quando** troco de aluno, **então** o boletim passa a ser o do novo aluno, no ano inicial dele.
- [x] **CA9** Loading e erro via `StateView`.
- [x] **CA10** O mapeamento, `isEvaluated`, a formatação de nota e a escolha do ano inicial têm testes.

## Cenários de erro / vazio
- **Aluno sem boletim** (`boletim: []`): `StateView` vazio "Boletim indisponível para este aluno".
- Ano pedido que não existe: o repository lança `Error("Boletim não encontrado")`, e o hook expõe o erro.
- Boletim sem trimestres, ou trimestre sem disciplinas: a tela não quebra.

## Fora de escopo
- Média anual calculada, frequência percentual, exportar PDF.

## Arquivos / camadas envolvidos
`src/features/report-card/` (`api/report-card.repository.ts`, `hooks/useReportCard.ts`, `utils/` com formatação e ano inicial, `components/` com o trimestre, a linha de disciplina e o seletor de ano, `screens/ReportCardScreen.tsx`), e o provider de aluno selecionado.

