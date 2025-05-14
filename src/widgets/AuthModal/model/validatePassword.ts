export const validatePassword = (password: string): string => {
  if (password.length === 0) {
    return "Вы не заполнили это поле";
  } else if (password.length < 6 || password.length > 24) {
    return "Пароль должен содержать от 6 до 24 символов";
  } else {
    return "";
  }
};
