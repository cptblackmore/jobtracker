import { SerializedStyles } from "@emotion/react";

export const getAuthInputAnim = (
  errors: { email?: string; password?: string; serverValidation?: string },
  target: "email" | "password",
  animation: SerializedStyles | null,
) => {
  return errors[target] || errors.serverValidation ? animation : {};
};
