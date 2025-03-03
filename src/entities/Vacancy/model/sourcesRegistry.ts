import { VacancyParams } from '../api/types/VacancyParams';
import { hhStyles, superjobStyles, trudvsemStyles } from '../ui/sourcesStyles';
import { Adapter } from './adapters/Adapter';
import { adapterHH } from './adapters/adapterHH';
import { adapterSuperjob } from './adapters/adapterSuperjob';
import { adapterTrudvsem } from './adapters/adapterTrudvsem';
import { SourceStyles } from './SourceStyles';
import { Sources } from './Sources';

export interface SourceConfig<K extends Sources> {
  adapter: Adapter<K>;
  styles: SourceStyles;
  incompatibleFilters?: Array<keyof VacancyParams['filters']>;
}

export const sourcesRegistry: {[K in Sources]: SourceConfig<K>} = {
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
