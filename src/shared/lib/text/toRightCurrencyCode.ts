export function toRightCurrencyCode(currencyCode: string): string {
  switch (currencyCode) {
    case "руб.":
    case "rub":
    case "«руб.»":
    case "RUR":
      return "RUB";
    case "BYR":
      return "BYN";
    default:
      return currencyCode;
  }
}
