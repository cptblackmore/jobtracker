import getSymbolFromCurrency from 'currency-symbol-map';

export function formatNumberByCurrency(number: number, code: string): string {
  const numberFormatter = new Intl.NumberFormat('ru-RU', {minimumFractionDigits: 0, maximumFractionDigits: 0});
  const formattedNumber = numberFormatter.format(number);
  const currencySymbol = getSymbolFromCurrency(code) !== undefined ? getSymbolFromCurrency(code) : code;
  return formattedNumber + ' ' + currencySymbol;
}
