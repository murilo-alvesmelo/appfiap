import { useState } from "react";
import { AppText, Box, Button, Input } from "@/components/ui";

import type { SignInCredentials, SignInFieldErrors } from "../types/auth.types";

type SignInFormProps = {
  onSubmit: (credentials: SignInCredentials) => void;
  fieldErrors: SignInFieldErrors;
  errorMessage?: string;
  isLoading: boolean;
};

/** Presentational: owns only input state, receives everything else via props. */
export function SignInForm({
  onSubmit,
  fieldErrors,
  errorMessage,
  isLoading,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box gap="md">
      <Input
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        error={fieldErrors.email}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        placeholder="voce@empresa.com"
      />
      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        error={fieldErrors.password}
        secureTextEntry
        autoComplete="password"
        placeholder="••••••"
      />
      {errorMessage !== undefined && (
        <AppText variant="caption" color="danger">
          {errorMessage}
        </AppText>
      )}
      <Button
        title="Entrar"
        isLoading={isLoading}
        onPress={() => onSubmit({ email, password })}
      />
    </Box>
  );
}
