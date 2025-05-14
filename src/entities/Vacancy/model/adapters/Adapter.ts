import { VacancyParams } from "@entities/Vacancy/api/types/VacancyParams";
import { Vacancy } from "../Vacancy";
import { SourcesMapping } from "../Sources";

export interface Adapter<K extends keyof SourcesMapping> {
  adaptParams(params: VacancyParams): SourcesMapping[K]["params"];
  adaptVacancies(
    vacancies: Array<SourcesMapping[K]["vacancy"]>,
  ): Array<Vacancy>;
  adaptVacancy(vacancy: SourcesMapping[K]["vacancy"]): Vacancy;
}
