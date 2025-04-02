import { keyframes } from '@emotion/react';
import { Sources, VacancyParams } from '@entities/Vacancy';

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

const sourceHighlightAnimation = keyframes`
  0% { transform: scale(1)}
  50% { transform: scale(0.95)}
  100% { transform: scale(1)}
`;

export const getHightlightAnimation = (
  highlightedSources: Sources[], 
  targetSource: Sources
) => {
  return highlightedSources.includes(targetSource) ? {animation: `${sourceHighlightAnimation} 0.5s ease`} : {};
}
