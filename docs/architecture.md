# Arquitetura

## Camadas

| Camada | Responsabilidade | Onde fica |
|---|---|---|
| **Presentation** | Renderizar UI e capturar input | `features/<x>/screens`, `features/<x>/components`, `components/ui`, `src/navigation` |
| **Business** | Regras, validação, orquestração de casos de uso, loading/erro, estado da feature | `features/<x>/hooks`, `features/<x>/utils`, `features/<x>/store`, `src/providers` |
| **Data** | Ler dados (JSON local, storage), mapear DTO → domínio | `features/<x>/api` (repository) |

> Se um componente de tela sabe buscar, transformar e renderizar dados, a arquitetura está vazando.

## Fluxo de dependências

```
src/navigation/*Navigator.tsx
   └─> @/features/x            (index.ts — API pública)
         └─> screens/XScreen.tsx
               ├─> components/*      (apresentação pura, via props)
               └─> hooks/useX.ts     (negócio: chama o repository, valida, loading/erro)
                     ├─> utils/*     (regras puras, sem React)
                     └─> api/x.repository.ts   (dados: DTO → domínio)
                           └─> arquivo JSON local
```

Os providers globais (`theme`, `session`) e o `NavigationContainer` são montados em `src/App.tsx`.

Módulos compartilhados (`components/ui`, `providers`, `lib`, `utils`, `constants`) **não conhecem features**.
