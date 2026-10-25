import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import { AuthenticatedHeader } from '@/components/layout';
import { useAppTheme } from '@/constants/theme';
import { LessonsScreen } from '@/features/lessons';
import { ReportCardScreen } from '@/features/report-card';

import type { AppTabsParamList } from './navigation.types';

const Tab = createBottomTabNavigator<AppTabsParamList>();

const renderHeader = () => <AuthenticatedHeader />;

/**
 * @description - Renderiza nada, para esconder o ícone da tab.
 */
const renderNoIcon = () => null;

/**
 * @description - Navegação do rodapé da área logada (Agenda e Boletim), com o
 * header autenticado em todas as tabs.
 */
export function AppTabs() {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName="Lessons"
      screenOptions={{
        header: renderHeader,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.colors.surface }],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarIcon: renderNoIcon,
      }}
    >
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{ title: 'AGENDA' }}
      />
      <Tab.Screen
        name="ReportCard"
        component={ReportCardScreen}
        options={{ title: 'BOLETIM' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
  },
  tabBarLabel: {
    fontWeight: '700',
  },
  tabBarIcon: {
    display: 'none',
  },
});
