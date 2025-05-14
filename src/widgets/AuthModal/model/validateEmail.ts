import { EMAIL_REGEXP } from "@shared/config";

export const validateEmail = (email: string): string => {
  if (email.length === 0) {
    return "Вы не заполнили это поле";
  } else if (!EMAIL_REGEXP.test(email)) {
    return "Некорректный email";
  } else {
    return "";
  }
};
