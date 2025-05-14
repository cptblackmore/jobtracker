import { VacancyParams } from "../api/types/VacancyParams";
import { hhStyles, superjobStyles, trudvsemStyles } from "../ui/sourcesStyles";
import { Adapter } from "./adapters/Adapter";
import { adapterHH } from "./adapters/adapterHH";
import { adapterSuperjob } from "./adapters/adapterSuperjob";
import { adapterTrudvsem } from "./adapters/adapterTrudvsem";
import { SourceStyles } from "./SourceStyles";
import { Sources } from "./Sources";

export interface SourceConfig<K extends Sources> {
  adapter: Adapter<K>;
  styles: SourceStyles;
  url: {
    frontendOrigin: string;
    frontendDomain: string;
    status: string;
    api: string;
  };
  incompatibleFilters?: Array<keyof VacancyParams["filters"]>;
}

export const sourcesRegistry: { [K in Sources]: SourceConfig<K> } = {
  superjob: {
    adapter: adapterSuperjob,
    styles: superjobStyles,
    url: {
      frontendOrigin: "https://superjob.ru",
      frontendDomain: "superjob.ru",
      status: "https://api.superjob.ru",
      api: "https://api.superjob.ru/2.0",
    },
  },
  hh: {
    adapter: adapterHH,
    styles: hhStyles,
    url: {
      frontendOrigin: "https://hh.ru",
      frontendDomain: "hh.ru",
      status: "https://api.hh.ru/status",
      api: "https://api.hh.ru",
    },
  },
  trudvsem: {
    adapter: adapterTrudvsem,
    styles: trudvsemStyles,
    url: {
      frontendOrigin: "https://trudvsem.ru",
      frontendDomain: "trudvsem.ru",
      status: "https://opendata.trudvsem.ru/api/v1/vacancies?limit=1",
      api: "https://opendata.trudvsem.ru/api/v1",
    },
    incompatibleFilters: ["period", "type", "salary"],
  },
} as const;
