import getSymbolFromCurrency from "currency-symbol-map";

export function toRightCurrencyCode(currencyCode: string): string {
  switch (currencyCode) {
    case 'руб.':
    case '«руб.»':
    case 'RUR':
      return 'RUB';
    case 'BYR':
      return 'BYN';
    default:
      if (getSymbolFromCurrency(currencyCode) === undefined) console.warn('Currency code not found in toRightCurrencyCode.ts:', currencyCode); // TODO Comment this line after finding all variants
      return currencyCode;
  }
}
