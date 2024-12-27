import { VacancyParams } from "@entities/Vacancy";

export type Action = 
  | {type: 'SET_TEXT'; text: VacancyParams['filters']['text']}
  | {type: 'SET_PERIOD'; period: VacancyParams['filters']['period']}
  | {type: 'SET_SALARY_FROM'; salary: VacancyParams['filters']['salary']}
  | {type: 'SET_SALARY_TO'; salary: VacancyParams['filters']['salary']}
  | {type: 'HANDLE_SALARY_SLIDER_CHANGE'; salary: VacancyParams['filters']['salary']}

export const vacancyFilterReducer = (state: VacancyParams['filters'], action: Action): VacancyParams['filters'] => {
  switch (action.type) {
    case 'SET_TEXT':
      return {...state, text: action.text};
    case 'SET_PERIOD':
      return {...state, period: action.period};
    case 'SET_SALARY_FROM':
      return {...state, salary: {from: Math.min(action?.salary?.from ?? 0, state?.salary?.to ?? 0), to: state?.salary?.to}}
    case 'SET_SALARY_TO':
      return {...state, salary: {from: state?.salary?.from, to: Math.max(action?.salary?.to ?? 0, state?.salary?.from ?? 0)}}
    case 'HANDLE_SALARY_SLIDER_CHANGE':
      return {...state, salary: {from: action?.salary?.from ?? 0, to: action?.salary?.to ?? 0}}
    default:
      return state;
  }
}
