export const errorMessages: Record<string, string> = {
  INVALID_EMAIL: 'Некорректный email.',
  INVALID_PASSWORD: 'Пароль должен быть от 6 до 24 символов.',
  EMAIL_EXISTS: 'Пользователь с таким email уже существует.',
  INVALID_CREDENTIALS: 'Неправильный email или пароль.',
  UNAUTHORIZED: 'Вы не авторизованы.',
  ACTIVATION_LINK_NOT_FOUND: 'Ссылка активации не найдена или указана неверно.',
  USER_ALREADY_ACTIVATED: 'Вы уже активировали аккаунт.',
  REFRESH_TOKEN_CONFLICT: 'Возникли проблемы с авторизацией. Перезагрузите страницу.',
  TOO_MANY_RESENDS: 'Вы уже отправили письмо для подтверждения. Дождитесь окончания задержки.',
  UNKNOWN_ERROR: 'Произошла непредвиденная ошибка.',
}
