import { HHParams, SuperjobParams, TrudvsemParams } from "../api/types/Params";
import { VacancyHH } from "../api/types/VacancyHH";
import { VacancySuperjob } from "../api/types/VacancySuperjob";
import { VacancyTrudvsem, VacancyTrudvsemResponse } from "../api/types/VacancyTrudvsem";

export interface SourcesMapping {
  superjob: { params: SuperjobParams; vacancy: VacancySuperjob };
  hh: { params: HHParams; vacancy: VacancyHH };
  trudvsem: { params: TrudvsemParams; vacancy: VacancyTrudvsem | VacancyTrudvsemResponse };
}

export type Sources = keyof SourcesMapping;
