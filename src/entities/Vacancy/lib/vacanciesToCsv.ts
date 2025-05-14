import { toRightCurrencyCode } from "@shared/lib";
import { Vacancy } from "../model/Vacancy";

export const vacanciesToCsv = (vacancies: Vacancy[]) => {
  const divider = ";";
  const rows = [
    `Профессия${divider}Компания${divider}Место${divider}ЗП от${divider}ЗП до${divider}Валюта${divider}Ссылка`,
  ];
  for (const vacancy of vacancies) {
    const paymentFrom = vacancy.paymentFrom;
    const paymentTo = vacancy.paymentTo;
    const row = [
      vacancy.profession,
      vacancy.firmName,
      vacancy.town,
      paymentFrom || "",
      paymentTo || "",
      toRightCurrencyCode(vacancy.currency),
      vacancy.link,
    ].join(divider);
    rows.push(row);
  }

  return rows.join("\n");
};
