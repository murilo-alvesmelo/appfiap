# Animações (Reanimated 4)

Requisitos por tela: `docs/specs/animations.md`. Aqui ficam **como** animar.

Stack: `react-native-reanimated` 4 + `react-native-worklets` (plugin `react-native-worklets/plugin`, último em `babel.config.js`).
Ao mexer no Babel, rode `yarn start --reset-cache`.

## Padrões

### Entrada de tela/lista (layout animations)
```tsx
import Animated, { FadeInDown } from "react-native-reanimated";

<Animated.View entering={FadeInDown.duration(300).delay(index * 50)}>
  <LessonItem lesson={lesson} />
</Animated.View>
```
- Stagger: `delay(index * 50)` só nos primeiros itens visíveis (ex.: `Math.min(index, 8)`).
- Saída: `exiting={FadeOut}`. Troca de conteúdo (dia/ano/aluno): use `key` diferente para reanimar a entrada.

### Animação controlada (shake, indicador, press)
```tsx
import { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

const offset = useSharedValue(0);
const style = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));

function shake() {
  offset.value = withSequence(
    withTiming(-8, { duration: 50 }),
    withTiming(8, { duration: 50 }),
    withTiming(0, { duration: 50 }),
  );
}
```

### Reduzir movimento
`useReducedMotion()` → troque deslocamento por fade simples (ou sem animação). Layout animations aceitam `.reduceMotion(ReduceMotion.System)`.

## Regras
- Anime só `transform` e `opacity`. Nada de `width`/`height`/`top` animados.
- Lógica de animação fica em worklets (`useAnimatedStyle`, `withTiming`), sem `setState` por frame.
- Durações: 150–350 ms em feedback, até ~500 ms em entradas.
- Animações reutilizáveis e sem domínio (ex.: `FadeInView`, `useShake`, `PressableScale`) ficam em `src/components/ui/`.
- Animações específicas de uma feature ficam em `features/<x>/components/`.
- Cores e espaçamentos continuam vindo do tema (`useAppTheme()`), também dentro de estilos animados.

## Testes
O Jest usa o mock oficial (`react-native-reanimated/mock`) e o mock do worklets, configurados em `jest.setup.js`; as animações viram no-op nos testes.
