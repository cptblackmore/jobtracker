import {
  parseFormattedPlace,
  Vacancy,
  VacancyParams,
  VacancyType,
} from "@entities/Vacancy";
import { VacancySuperjob } from "../../api/types/VacancySuperjob";
import { SuperjobParams } from "../../api/types/Params";
import { Adapter } from "./Adapter";

export const adapterSuperjob: Adapter<"superjob"> = {
  adaptParams(params: VacancyParams): SuperjobParams {
    const typeMap: Record<VacancyType, SuperjobParams["type_of_work"]> = {
      full: 6,
      shift: 12,
      fifo: 9,
    };
    const parsedPlace = parseFormattedPlace(params.filters?.place);

    return {
      page: params.page,
      count: params.count,
      keyword: params.filters?.text ?? "",
      payment_from: params.filters?.salary?.from ?? null,
      payment_to: params.filters?.salary?.to ?? null,
      no_agreement:
        params.filters?.salary?.from || params.filters?.salary?.to ? 1 : 0,
      period: params.filters?.period ?? 0,
      type_of_work: params.filters?.type ? typeMap[params.filters.type] : null,
      t: params.filters?.place
        ? [
            `place~${parsedPlace.id ? `id~~${parsedPlace.id}` : `name~city~${parsedPlace.name}`}`,
          ]
        : null,
      o: params.filters?.place
        ? [
            `place~${parsedPlace.id ? `id~~${parsedPlace.id}` : `name~region~${parsedPlace.name}`}`,
          ]
        : null,
    };
  },

  adaptVacancies(vacancies: Array<VacancySuperjob>): Array<Vacancy> {
    return vacancies.map((vacancy) => {
      return {
        id: "sj_" + vacancy.id.toString(),
        profession: vacancy.profession,
        firmName: vacancy.firm_name,
        town: vacancy.town.title,
        description: vacancy.candidat,
        source: "superjob",
        paymentFrom: vacancy.payment_from,
        paymentTo: vacancy.payment_to,
        currency: vacancy.currency,
        link: vacancy.link,
        datePublished: vacancy.date_published * 1000,
        isFavorite: false,
      };
    });
  },

  adaptVacancy(vacancy: VacancySuperjob): Vacancy {
    return {
      id: "sj_" + vacancy.id.toString(),
      profession: vacancy.profession,
      firmName: vacancy.firm_name,
      town: vacancy.town.title,
      description: vacancy.candidat,
      source: "superjob",
      paymentFrom: vacancy.payment_from,
      paymentTo: vacancy.payment_to,
      currency: vacancy.currency,
      link: vacancy.link,
      datePublished: vacancy.date_published * 1000,
      isFavorite: false,
    };
  },
};
