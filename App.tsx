
import React, { useRef } from "react";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootStackParamList } from "./src/navigation/types";

import HomeScreen from "./src/screens/HomeScreen";
import ExhibitionScreen from "./src/screens/ExhibitionScreen";
import ChallengesScreen from "./src/screens/ChallengesScreen";
import HistoryScreen from "./src/screens/HistoryScreen";

import { COLORS } from "./src/theme/colors";

import {
  startSession,
  trackEvent,
} from "./src/services/interactionTracker";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const navigationRef =
    useNavigationContainerRef<RootStackParamList>();

  const lastScreen = useRef<string | null>(null);

  function registerCurrentScreen() {
    const route = navigationRef.getCurrentRoute();

    if (!route) {
      return;
    }

    const screenSignature = `${route.key}:${JSON.stringify(
      route.params ?? {},
    )}`;

    // Evita registrar duas vezes a mesma tela.
    if (lastScreen.current === screenSignature) {
      return;
    }

    lastScreen.current = screenSignature;

    let details: Record<string, unknown> | undefined;

    if (route.name === "Exhibition") {
      details = {
        topicId: route.params.topicId,
      };
    }

    trackEvent("screen_view", route.name, details).catch((error) => {
      console.error("Erro ao registrar acesso à tela:", error);
    });
  }

  function handleNavigationReady() {
    startSession();
    registerCurrentScreen();
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={handleNavigationReady}
        onStateChange={registerCurrentScreen}
      >
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.background,
            },
            headerTintColor: COLORS.text,
            headerTitleStyle: {
              fontWeight: "800",
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: COLORS.background,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Exhibition"
            component={ExhibitionScreen}
            options={{
              title: "Exposição",
            }}
          />

          <Stack.Screen
            name="Challenges"
            component={ChallengesScreen}
            options={{
              title: "Desafios",
            }}
          />

          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{
              title: "Histórico de interações",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
