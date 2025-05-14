export function combineDutyAndReqToDesc(
  duty?: string | null | undefined,
  req?: string | null | undefined,
): string {
  if (!duty && !req) {
    return "Описание не найдено.";
  }
  const description =
    (duty ? `Обязанности: ${duty}` : "") +
    " " +
    (req ? `Требования: ${req}` : "");
  return description;
}
