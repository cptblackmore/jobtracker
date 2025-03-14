import { Vacancy, VacancyParams } from '@entities/Vacancy';

export type ActionVacancies = 'SET_VACANCIES' | 'ADD_VACANCIES';

export type Action = 
  | {type: 'SET_PAGE', page: VacancyParams['page']}
  | {type: 'SET_FILTERS', filters: VacancyParams['filters']}
  | {type: ActionVacancies, vacancies: Array<Vacancy>}

export interface State {
  params: VacancyParams;
  vacancies: Array<Vacancy>
}

export const vacancyListReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PAGE':
      return {...state, params: {...state.params, page: action.page}};
    case 'SET_FILTERS':
      return {...state, params: {...state.params, filters: action.filters}};
    case 'SET_VACANCIES':
      return {...state, vacancies: action.vacancies};
    case 'ADD_VACANCIES':
      return {...state, vacancies: [...state.vacancies, ...action.vacancies]};
    default:
      return state;
  }
}
