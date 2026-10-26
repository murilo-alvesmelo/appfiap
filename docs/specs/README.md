# Specs (SDD)

Uma spec por fluxo do app, derivada de `teste-tecnico-mobile.md`.
A spec é o **contrato**: define o que o fluxo faz e como verificar que está pronto.
Código, testes e o `ROADMAP.md` seguem a spec, não o contrário.

## Fluxo de trabalho

1. **Spec**: leia (ou crie/atualize) a spec do fluxo antes de implementar.
2. **Plano**: quebre os critérios de aceite em tarefas (`ROADMAP.md`).
3. **Código**: implemente seguindo `AGENTS.md` e `docs/`.
4. **Testes**: cada regra de negócio pura vira teste unitário. Os critérios de UI são conferidos no app.
5. **Fechamento**: marque os critérios atendidos na spec e o item no `ROADMAP.md`.

Mudou o requisito? Atualize a spec **primeiro**, no mesmo commit da mudança de código.

## Índice

| Spec | Fluxo | Fases do ROADMAP |
|---|---|---|
| [data-model.md](./data-model.md) | JSON → DTO → domínio (`src/data/`) | 1 |
| [sign-in.md](./sign-in.md) | Login, sessão persistida, logout | 2 |
| [app-header.md](./app-header.md) | Shell autenticado: header + bottom tabs | 3 |
| [lessons.md](./lessons.md) | Aulas do dia | 4 |
| [report-card.md](./report-card.md) | Boletim | 5 |
| [student-picker.md](./student-picker.md) | Seleção de aluno | 6 |

Os cenários de erro transversais estão nas specs dos fluxos afetados:
- Responsável sem alunos: [app-header.md](./app-header.md#cenários-de-erro--vazio)
- Aluno sem agenda: [lessons.md](./lessons.md#cenários-de-erro--vazio)
- Aluno sem boletim: [report-card.md](./report-card.md#cenários-de-erro--vazio)
- Sessão persistida inválida: [sign-in.md](./sign-in.md#cenários-de-erro--vazio)

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
| Boletim de 2025 com só o 1º trimestre avaliado | report-card (CA1, CA4) |
| Ano, turma, trimestres, disciplinas, notas e faltas | report-card (CA2, CA3) |
| Bônus: anos anteriores | report-card (CA6) |
| Seleção: não exibir com um aluno só | student-picker (CA1) |
| Seleção: nome completo, RM e turma | student-picker (CA2) |
| Seleção: voltar à tela anterior | student-picker (CA4) |
| Seleção fora do rodapé | student-picker (CA5) |

