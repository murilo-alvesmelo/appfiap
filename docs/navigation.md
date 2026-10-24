# Navegação (React Navigation)

## Estrutura atual
```
src/navigation/
  navigation.types.ts  # RootStackParamList, AppTabsParamList + tipagem global do useNavigation
  RootNavigator.tsx    # Native stack raiz: SignIn (deslogado) ou AppTabs (logado)
  AppTabs.tsx          # Bottom tabs da área logada (rodapé)
  index.ts
src/App.tsx            # NavigationContainer (tema derivado do Restyle) + RootNavigator
```

## Regras
- Navigators só registram screens importadas de `@/features/<x>`:
  ```tsx
  <Tab.Screen name="Lessons" component={LessonsScreen} options={{ title: "Aulas" }} />
  ```
- Toda tela nova entra na **param list** em `navigation.types.ts` (`undefined` quando não tem parâmetro)
- Nomes de rota em `PascalCase`
- `headerShown: false`: o cabeçalho é um componente do app, não o header do navigator
- Navegue com `useNavigation()` (já tipado globalmente via `ReactNavigation.RootParamList`):
  ```tsx
  const navigation = useNavigation();
  navigation.navigate("StudentPicker");
  navigation.goBack();
  ```
- Parâmetros: tipar a screen com `NativeStackScreenProps<RootStackParamList, "Xxx">` (ou `useRoute`) **na screen** e passar ao hook

## Autenticação
`RootNavigator` renderiza `SignIn` **ou** `AppTabs` conforme `isSignedIn` de `useSession()`.
Ao chamar `signIn`/`signOut`, o React Navigation troca a tela sozinho. **Não** chame `navigate`/`reset` após login/logout.

## Nova tab (rodapé)
1. Adicione a rota em `AppTabsParamList`
2. Registre `<Tab.Screen name="..." component={...} options={{ title }} />` em `AppTabs.tsx`

## Tela fora do rodapé (stack/modal)
1. Adicione a rota em `RootStackParamList`
2. Registre no grupo logado do `RootNavigator`, como modal quando fizer sentido:
   ```tsx
   <Stack.Screen name="StudentPicker" component={StudentPickerScreen} options={{ presentation: "modal" }} />
   ```
3. Para voltar à tela anterior após uma ação: `navigation.goBack()`
