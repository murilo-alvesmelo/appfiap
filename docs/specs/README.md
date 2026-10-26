# Specs (SDD)

Uma spec por fluxo do app, derivada de `teste-tecnico-mobile.md`.
A spec é o **contrato**: define o que o fluxo faz e como verificar que está pronto.
Código e testes seguem a spec, não o contrário.

## Fluxo de trabalho

1. **Spec**: leia (ou crie/atualize) a spec do fluxo antes de implementar.
2. **Plano**: quebre os critérios de aceite em tarefas antes de codar.
3. **Código**: implemente seguindo `AGENTS.md` e `docs/`.
4. **Testes**: cada regra de negócio pura vira teste unitário. Os critérios de UI são conferidos no app.
5. **Fechamento**: marque os critérios atendidos na spec.


## Índice

O prefixo numérico (`NN-`) é a ordem de desenvolvimento. Uma spec nova recebe o próximo número.

| Spec | Fluxo | Ordem |
|---|---|---|
| [01-data-model.md](./01-data-model.md) | JSON → DTO → domínio (`src/data/`) | 1 |
| [02-sign-in.md](./02-sign-in.md) | Login, sessão persistida, logout | 2 |
| [03-app-header.md](./03-app-header.md) | Shell autenticado: header + bottom tabs | 3 |
| [04-lessons.md](./04-lessons.md) | Aulas do dia | 4 |
| [05-report-card.md](./05-report-card.md) | Boletim | 5 |
| [06-student-picker.md](./06-student-picker.md) | Seleção de aluno | 6 |

Os cenários de erro transversais estão nas specs dos fluxos afetados:
- Responsável sem alunos: [03-app-header.md](./03-app-header.md#cenários-de-erro--vazio)
- Aluno sem agenda: [04-lessons.md](./04-lessons.md#cenários-de-erro--vazio)
- Aluno sem boletim: [05-report-card.md](./05-report-card.md#cenários-de-erro--vazio)
- Sessão persistida inválida: [02-sign-in.md](./02-sign-in.md#cenários-de-erro--vazio)

## Template

```md
# <Fluxo>

## Objetivo
## Fonte (requisito do teste)
## Regras de negócio
## Critérios de aceite
- [ ] **Dado** ..., **quando** ..., **então** ...
## Cenários de erro / vazio
## Fora de escopo
## Arquivos / camadas envolvidos
```

## Rastreabilidade (teste técnico → spec)

| Requisito do teste | Spec |
|---|---|
| Login com CPF e senha do responsável | sign-in (CA1, CA2) |
| Máscara `XXX.XXX.XXX-XX` no CPF | sign-in (CA3) |
| Erro quando CPF ou senha inválidos | sign-in (CA4) |
| Sem links de recuperação/cadastro | sign-in (CA5) |
| Manter autenticação ao reabrir e abrir em Aulas | sign-in (CA7, CA8) |
| Header: primeiro nome do responsável | app-header (CA1) |
| Header: primeiro nome, RM, turma e período do aluno | app-header (CA2) |
| Header: botão de seleção só com 2+ alunos | app-header (CA3, CA4) |
| Header: botão de logout | app-header (CA5) |
| Rodapé com Aulas e Boletim | app-header (CA7) |
| Aulas do dia com início, término e disciplina | lessons (CA1, CA2) |
| Navegar entre os dias da semana | lessons (CA3) |
| Boletim de 2025 com só o 1º trimestre avaliado | report-card (CA1, CA4; regras 2 e 4) |
| Ano, turma, trimestres, disciplinas, notas e faltas | report-card (CA2, CA3) |
| Bônus: anos anteriores | report-card (CA6) |
| Seleção: não exibir com um aluno só | student-picker (CA1) |
| Seleção: nome completo, RM e turma | student-picker (CA2) |
| Seleção: voltar à tela anterior | student-picker (CA4) |
| Seleção fora do rodapé | student-picker (CA5) |

