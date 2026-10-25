import type { NavigatorScreenParams } from '@react-navigation/native';

/** Telas do rodapé (área logada). */
export type AppTabsParamList = {
  Lessons: undefined;
  ReportCard: undefined;
};

/** Stack raiz. Telas fora do rodapé (ex.: modais) entram aqui. */
export type RootStackParamList = {
  SignIn: undefined;
  AppTabs: NavigatorScreenParams<AppTabsParamList>;
  StudentPicker: undefined;
};

// Declaration merging exige `interface` (exceção à regra de usar `type`).
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
