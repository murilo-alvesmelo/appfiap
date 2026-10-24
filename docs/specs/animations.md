# Animações (transversal)

## Objetivo
Toda tela tem animação, deixando o app fluido sem prejudicar a performance.

## Fonte (requisito do teste)
"Todas as telas devem conter animações. [...] desenvolver um aplicativo fluido e com efeitos visuais interessantes, que aprimoram a experiência do usuário sem prejudicar a performance."

## Regras gerais
1. Animar só `transform` e `opacity` (sem animar layout/cor em loop), com o driver nativo (`useNativeDriver: true`) ou worklets.
2. Durações curtas: 150 a 350 ms em feedback, até cerca de 500 ms em entradas. Stagger de 40 a 60 ms por item, limitado aos primeiros itens visíveis.
3. Respeitar "Reduzir movimento" do sistema (`AccessibilityInfo.isReduceMotionEnabled`): nesse caso, trocar por fade simples ou nenhuma animação.
4. Hooks/componentes de animação reutilizáveis ficam em `src/components/ui/` (ex.: `FadeIn`, `useShake`), sem conhecer domínio.
5. **Lib pendente de decisão:** `Animated` nativo vs. `react-native-reanimated` 🔒 (item aberto da Fase 0). As specs não dependem da escolha.

## Por tela

### Login
- [ ] Entrada do logo e do formulário (fade + translateY).
- [ ] Shake na mensagem de erro de credenciais.
- [ ] Loading no botão durante o submit.

### Header
- [ ] Transição (crossfade/slide) dos dados do aluno ao trocar.

### Aulas
- [ ] Indicador do dia ativo desliza entre os dias.
- [ ] Lista entra em sequência (stagger) a cada troca de dia.

### Boletim
- [ ] Transição ao trocar de ano/trimestre.
- [ ] Entrada das linhas de disciplina.

### Seleção de aluno
- [ ] Entrada da lista (stagger).
- [ ] Feedback de toque (scale/opacity no press).

### Navegação
- [ ] Transições suaves entre as tabs e na abertura/fechamento do modal.

## Critérios de aceite transversais
- [ ] **CA-T1** Toda tela da lista acima tem pelo menos uma animação ativa.
- [ ] **CA-T2** Sem queda perceptível de fps (alvo 60 fps) em device físico iOS e Android (conferir com o Perf Monitor).
- [ ] **CA-T3** Com "Reduzir movimento" ligado, o app continua usável e sem animações de deslocamento.

## Fora de escopo
- Animações Lottie, ilustrações animadas.

## Referência do Figma
Protótipo/motion do Figma: a extrair, se existir.
