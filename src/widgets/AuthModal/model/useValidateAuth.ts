import { Dispatch, SetStateAction, useCallback } from "react";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";

export const useValidateAuth = (
  setErrors: Dispatch<
    SetStateAction<{
      email?: string;
      password?: string;
      serverValidation?: string;
    }>
  >,
) => {
  const validateInput = useCallback(
    (input: "email" | "password", value: string) => {
      if (input === "email") {
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
      } else if (input === "password") {
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
      }
    },
    [setErrors],
  );

  const validateForm = useCallback(
    (email: string, password: string) => {
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);

      setErrors((prev) => ({
        ...prev,
        email: emailError,
        password: passwordError,
      }));
      return (emailError && "email") || (passwordError && "password");
    },
    [setErrors],
  );

  return { validateInput, validateForm };
};
