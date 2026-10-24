import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useAppTheme } from "@/constants/theme";
import { HomeScreen } from "@/features/home";

import type { AppTabsParamList } from "./navigation.types";

const Tab = createBottomTabNavigator<AppTabsParamList>();

/**
 * @description - Navegação do rodapé da área logada.
 */
export function AppTabs() {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
    </Tab.Navigator>
  );
}
