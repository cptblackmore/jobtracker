export const validateAuthForm = (email: string, password: string) => {
  const newErrors: {
    email?: string;
    password?: string;
  } = {};

  if (email.length === 0) {
    newErrors.email = 'Вы не заполнили это поле';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    newErrors.email = 'Некорректный email';
  }

  if (password.length === 0) {
    newErrors.password = 'Вы не заполнили это поле';
  } else if (password.length < 6 || password.length > 24) {
    newErrors.password = 'Пароль должен содержать от 6 до 24 символов';
  }

  if (Object.keys(newErrors).length > 0) return newErrors;
}
