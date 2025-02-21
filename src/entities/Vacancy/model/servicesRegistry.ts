import { HHParams, SuperjobParams, TrudvsemParams } from "../api/types/Params";
import { VacancyHH } from "../api/types/VacancyHH";
import { VacancyParams } from "../api/types/VacancyParams";
import { VacancySuperjob } from "../api/types/VacancySuperjob";
import { VacancyTrudvsem, VacancyTrudvsemResponse } from "../api/types/VacancyTrudvsem";
import { hhStyles, superjobStyles, trudvsemStyles } from "../ui/servicesStyles";
import { Adapter } from "./adapters/Adapter";
import { adapterHH } from "./adapters/adapterHH";
import { adapterSuperjob } from "./adapters/adapterSuperjob";
import { adapterTrudvsem } from "./adapters/adapterTrudvsem";
import { ServiceStyles } from "./ServiceStyles";
import { Sources } from "./Sources";

export interface ServiceConfig {
  adapter: Adapter<
    SuperjobParams | HHParams | TrudvsemParams,
    VacancySuperjob | VacancyHH | VacancyTrudvsem | VacancyTrudvsemResponse
  >;
  styles: ServiceStyles;
  incompatibleFilters?: Array<keyof VacancyParams['filters']>;
}

export const servicesRegistry: Record<Sources, ServiceConfig> = {
  superjob: {
    adapter: adapterSuperjob,
    styles: superjobStyles
  },
  hh: {
    adapter: adapterHH,
    styles: hhStyles
  },
  trudvsem: {
    adapter: adapterTrudvsem,
    styles: trudvsemStyles,
    incompatibleFilters: ['period', 'type', 'salary']
  }
} as const;
