import { Sources, VacancyParams } from '@entities/Vacancy';
import { disableKeyframes } from '@shared/ui';

export const getHighlightedColorStyle = (
  highlightedFilters: Array<keyof VacancyParams['filters']>, 
  targetFilter: keyof VacancyParams['filters']
) => {
  return highlightedFilters.includes(targetFilter) ? {color: 'warning.main'} : {};
}

export const getHighlightedBorderStyle = (
  highlightedFilters: Array<keyof VacancyParams['filters']>, 
  targetFilter: keyof VacancyParams['filters']
) => {
  return highlightedFilters.includes(targetFilter) ? {borderColor: 'warning.main'} : {};
}

export const getHightlightAnimation = (
  highlightedSources: Sources[], 
  targetSource: Sources
) => {
  return highlightedSources.includes(targetSource) ? {animation: `${disableKeyframes} 0.5s ease`} : {};
}
