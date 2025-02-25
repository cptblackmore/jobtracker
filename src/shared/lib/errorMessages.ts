export const errorMessages: Record<string, string> = {
  INVALID_EMAIL: 'Некорректный email.',
  INVALID_PASSWORD: 'Пароль должен быть от 6 до 24 символов.',
  EMAIL_EXISTS: 'Пользователь с таким email уже существует.',
  INVALID_CREDENTIALS: 'Неправильный email или пароль.',
  UNAUTHORIZED: 'Вы не авторизованы.',
  ACTIVATION_LINK_NOT_FOUND: 'Ссылка активации не найдена или указана неверно.',
  USER_ALREADY_ACTIVATED: 'Вы уже активировали аккаунт.',
  INVALID_REFRESH_TOKEN: 'Ошибка авторизации. Перезагрузите страницу или войдите заново.',
  TOO_MANY_RESENDS: 'Вы уже отправили письмо для подтверждения. Дождитесь окончания задержки.',
  ERR_NETWORK: 'Ошибка сети. Проверьте подключение или попробуйте позже.',
  ERR_BAD_REQUEST: 'Неправильные параметры запроса. Проверьте запрос или перезагрузите страницу.',
  FAVORITES_NOT_FOUND: 'Некоторые вакансии были удалены из источников. Список избранного обновлён.',
  UNKNOWN_ERROR: 'Произошла непредвиденная ошибка.',
}
