import { toRightCurrencyCode } from '@shared/lib';
import { Vacancy } from '../model/Vacancy';

export const vacanciesToText = (vacancies: Vacancy[]) => {
  return vacancies.map((vacancy) => {
    const paymentFrom = vacancy.paymentFrom;
    const paymentTo = vacancy.paymentTo;
    const lines = [];
    lines.push(`Профессия: ${vacancy.profession}`);
    lines.push(`Компания: ${vacancy.firmName}`);
    lines.push(`Местоположение: ${vacancy.town}`);
    
    if (paymentFrom || paymentTo) {
      let salary = 'Зарплата: ';
      if (paymentFrom && paymentTo) {
        salary += `${paymentFrom} - ${paymentTo} `;
      } else {
        if (paymentFrom) {
          salary += `от ${paymentFrom} `;
        }
        if (paymentTo) {
          salary += `до ${paymentTo} `;
        }
      }
      salary += toRightCurrencyCode(vacancy.currency);
      lines.push(salary.trim());
    }
    
    lines.push(`Ссылка: ${vacancy.link}`);
    return lines.join('\n');
  }).join('\n\n');
}
