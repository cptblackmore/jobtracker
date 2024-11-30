import Globalize from "globalize";
import numbers from "cldr-data/main/en/numbers.json"
import numberingSystems from "cldr-data/supplemental/numberingSystems.json"
import currencies from "cldr-data/main/en/currencies.json"
import likelySubtags from "cldr-data/supplemental/likelySubtags.json"
import currencyFractions from "cldr-data/supplemental/currencyData.json"

Globalize.load([
  numbers,
  numberingSystems,
  currencies,
  likelySubtags,
  currencyFractions
]);

const globalize = new Globalize("en");

const formatted = globalize.currencyFormatter("USD")(-12345.67);
console.log(formatted); // "$-12,345.67"
