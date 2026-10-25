import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import { AuthenticatedHeader } from '@/components/layout';
import { CalendarIcon } from '@/components/svg/CalendarIcon';
import { ReportCardIcon } from '@/components/svg/ReportCardIcon';
import { useAppTheme } from '@/constants/theme';
import { LessonsScreen } from '@/features/lessons';
import { ReportCardScreen } from '@/features/report-card';

import type { AppTabsParamList } from './navigation.types';

const Tab = createBottomTabNavigator<AppTabsParamList>();

type TabIconProps = {
  color: string;
};

const renderHeader = () => <AuthenticatedHeader />;

/**
 * @description - Ícone da tab Agenda. `color` é a cor ativa (ciano) ou inativa,
 * definida por `tabBarActiveTintColor`/`tabBarInactiveTintColor`.
 */
const renderLessonsIcon = ({ color }: TabIconProps) => (
  <CalendarIcon color={color} />
);

/**
 * @description - Ícone da tab Boletim. `color` é a cor ativa (ciano) ou inativa,
 * definida por `tabBarActiveTintColor`/`tabBarInactiveTintColor`.
 */
const renderReportCardIcon = ({ color }: TabIconProps) => (
  <ReportCardIcon color={color} />
);

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
      }}
    >
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{ title: 'AGENDA', tabBarIcon: renderLessonsIcon }}
      />
      <Tab.Screen
        name="ReportCard"
        component={ReportCardScreen}
        options={{ title: 'BOLETIM', tabBarIcon: renderReportCardIcon }}
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
});
