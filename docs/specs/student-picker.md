# Seleção de aluno

## Objetivo
Permitir que o responsável com mais de um aluno escolha qual deles acompanhar.

## Fonte (requisito do teste)
- Não é necessário exibir esta tela quando o responsável tem apenas um aluno.
- Listar os alunos vinculados com nome completo, RM e turma.
- Após a seleção, retornar à tela em que o responsável estava.
- A tela **não** integra a navegação do rodapé.

## Regras de negócio
1. A rota `StudentPicker` fica no stack raiz (grupo logado), com `presentation: "modal"`, fora do `AppTabs`.
2. A lista vem dos `students` do responsável da sessão, na ordem do JSON.
3. O aluno selecionado atualmente fica destacado (visualmente e com `accessibilityState={{ selected: true }}`).
4. Ao tocar num aluno: `selectStudent(rm)` no provider e depois `navigation.goBack()`.
5. Tocar no aluno já selecionado só faz `goBack()`.
6. O acesso à tela só existe quando `students.length > 1` (botão no header). Se a rota for aberta com um aluno só, ela volta imediatamente.

## Critérios de aceite
- [ ] **CA1** **Dado** Adelaide (1 aluna), **então** não há caminho na UI para esta tela.
- [ ] **CA2** **Dado** Gustavo, **quando** abro a seleção, **então** vejo "Rafael da Silva · RM 12567 · 7EF" e "Joana da Silva · RM 12568 · 2EM".
- [ ] **CA3** O aluno atual aparece destacado.
- [ ] **CA4** **Dado** que estou em Boletim, **quando** seleciono Joana, **então** volto para Boletim já com os dados de Joana.
- [ ] **CA5** A tela não aparece como tab no rodapé.
- [ ] **CA6** Fechar o modal sem selecionar mantém o aluno atual.

## Cenários de erro / vazio
- Lista vazia (responsável sem alunos): a tela não é acessível (ver app-header). Se for aberta assim mesmo, mostra `StateView` vazio.

## Animações
Ver [animations.md](./animations.md#seleção-de-aluno): entrada da lista e feedback de toque.

## Fora de escopo
- Busca/filtro de alunos, foto do aluno.

## Arquivos / camadas envolvidos
`src/features/students/` (`components/` com o item de aluno, `screens/StudentPickerScreen.tsx`, e hook se houver regra), o provider de aluno selecionado, `src/navigation/RootNavigator.tsx` e `navigation.types.ts`.

## Referência do Figma
Tela de seleção: node-id a extrair.
