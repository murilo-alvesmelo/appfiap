import { View } from "react-native";

import { AppText, Screen } from "@/components/ui";
import { SignInForm } from "../components/SignInForm";
import { useSignIn } from "../hooks/useSignIn";

export function SignInScreen() {
  const { submit, fieldErrors, errorMessage, isLoading } = useSignIn();
  return (
    <Screen scroll>
      <View>
        <AppText variant="title">Bem-vindo</AppText>
      </View>
      <SignInForm
        onSubmit={submit}
        fieldErrors={fieldErrors}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </Screen>
  );
}
