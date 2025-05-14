import { sourcesRegistry } from "@entities/Vacancy";
import { VacancyService } from "../api/VacancyService";
import { SourceId } from "../model/Sources";
import { VacanciesWithMissingIds } from "../api/types/VacanciesWithMissingIds";

export const getVacanciesByIds = async (
  ids: string[],
  source: SourceId,
  signal: AbortSignal,
): Promise<VacanciesWithMissingIds> => {
  const adapterSuperjob = sourcesRegistry.superjob.adapter;

  switch (source) {
    case "sj": {
      const response = await VacancyService.getSuperjobByIds(ids, signal);
      if (response.data.objects.length !== ids.length) {
        const responseIds = new Set(
          response.data.objects.map((vacancy) => String(vacancy.id)),
        );
        const missingIds = ids.filter((id) => !responseIds.has(id));
        if (missingIds.length > 0) {
          return {
            vacancies: adapterSuperjob.adaptVacancies(response.data.objects),
            missingIds,
          };
        }
      }
      return {
        vacancies: adapterSuperjob.adaptVacancies(response.data.objects),
      };
    }
    case "hh": {
      throw new Error(
        `${source} не поддерживает множественное получение вакансий`,
      );
    }
    case "tv": {
      throw new Error(
        `${source} не поддерживает множественное получение вакансий`,
      );
    }
    default: {
      throw new Error(`Неизвестный источник: ${source}`);
    }
  }
};
