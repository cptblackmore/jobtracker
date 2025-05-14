import { Vacancy } from "@entities/Vacancy";
import { sourcesRegistry } from "@entities/Vacancy";

export const getDetailsLabel = (
  vacancy: Vacancy,
  howLongAgo: string,
): string => {
  const {
    profession,
    firmName,
    town,
    paymentFrom,
    paymentTo,
    currency,
    source,
  } = vacancy;

  const salaryLabel = (() => {
    if (paymentFrom && paymentTo) {
      return `с зарплатой от ${paymentFrom} до ${paymentTo} ${currency}`;
    }
    if (paymentFrom) {
      return `с зарплатой от ${paymentFrom} ${currency}`;
    }
    if (paymentTo) {
      return `с зарплатой до ${paymentTo} ${currency}`;
    }
    return `зарплата не указана`;
  })();

  const sourceLabel = sourcesRegistry[source].styles.name;

  return `Вакансия ${profession} в ${firmName} в городе ${town}, ${salaryLabel}, опубликовано ${howLongAgo} на ${sourceLabel}`;
};
