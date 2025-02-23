import { VacancyParams } from "../api/types/VacancyParams";
import { hhStyles, superjobStyles, trudvsemStyles } from "../ui/servicesStyles";
import { Adapter } from "./adapters/Adapter";
import { adapterHH } from "./adapters/adapterHH";
import { adapterSuperjob } from "./adapters/adapterSuperjob";
import { adapterTrudvsem } from "./adapters/adapterTrudvsem";
import { ServiceStyles } from "./ServiceStyles";
import { Sources } from "./Sources";

export interface ServiceConfig<K extends Sources> {
  adapter: Adapter<K>;
  styles: ServiceStyles;
  incompatibleFilters?: Array<keyof VacancyParams['filters']>;
}

export const servicesRegistry: {[K in Sources]: ServiceConfig<K>} = {
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
