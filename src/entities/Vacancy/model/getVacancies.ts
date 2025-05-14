import {
  Sources,
  Vacancy,
  VacancyParams,
  parseFormattedPlace,
  sourcesRegistry,
} from "@entities/Vacancy";
import { VacancyService } from "../api/VacancyService";
import { AxiosError } from "axios";

export const getVacancies = async (
  params: VacancyParams,
  source: Sources,
  signal: AbortSignal,
): Promise<Vacancy[]> => {
  const adapterSuperjob = sourcesRegistry.superjob.adapter;
  const adapterHH = sourcesRegistry.hh.adapter;
  const adapterTrudvsem = sourcesRegistry.trudvsem.adapter;

  switch (source) {
    case "superjob": {
      const response = await VacancyService.getSuperjob(
        adapterSuperjob.adaptParams(params),
        signal,
      );
      return adapterSuperjob.adaptVacancies(response.data.objects);
    }
    case "hh": {
      const response = await VacancyService.getHH(
        adapterHH.adaptParams(params),
        signal,
      );
      return adapterHH.adaptVacancies(response.data.items);
    }
    case "trudvsem": {
      try {
        const parsedPlace = parseFormattedPlace(params.filters?.place);
        const regionEndpoint = params.filters?.place
          ? `region/place~${parsedPlace.id ? `id~~${parsedPlace.id}` : `name~~${encodeURIComponent(parsedPlace.name || "")}`}`
          : undefined;
        const response = await VacancyService.getTrudvsem(
          adapterTrudvsem.adaptParams(params),
          signal,
          regionEndpoint,
        );
        const vacancies = response.data.results.vacancies.map(
          (vacancyContainer) => vacancyContainer.vacancy,
        );
        return adapterTrudvsem.adaptVacancies(vacancies);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.status === 502) {
            throw new AxiosError(e.message, "SOURCE_UNAVAILABLE");
          }
          throw e;
        } else {
          throw e;
        }
      }
    }
    default: {
      throw new Error(`Неизвестный источник: ${source}`);
    }
  }
};
