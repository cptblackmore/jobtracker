import { VacancyParams } from "@entities/Vacancy/api/types/VacancyParams";
import { Vacancy } from "../Vacancy";

export interface Adapter<P, V> {
  adaptParams(params: VacancyParams): P;
  adaptVacancies(data: Array<V>): Array<Vacancy>;
  adaptVacancy(vacancy: V): Vacancy;
}
