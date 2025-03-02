import { getVacancies, Vacancy, VacancyParams } from '@entities/Vacancy';
import { AlertsStore } from '@shared/model';
import axios, { AxiosError } from 'axios';
import { Dispatch, MutableRefObject } from 'react';
import { handleErrors } from './handleErrors';

export const fetchVacancies = async (
  params: VacancyParams,
  dispatch: Dispatch<{type: 'SET_VACANCIES' | 'ADD_VACANCIES', vacancies: Array<Vacancy>}>,
  vacancyIds: MutableRefObject<Set<string>>,
  actionType: 'SET_VACANCIES' | 'ADD_VACANCIES', 
  signal: AbortSignal,
  alertsStore: AlertsStore
) => {
  const errors = new Set<string>();
  try {
    const newVacancies: Array<Vacancy> = await getVacancies(params, signal);
    const uniqueVacancies: Array<Vacancy> = newVacancies.filter((vacancy) => {
      if (!vacancyIds.current.has(vacancy.id)) {
        vacancyIds.current.add(vacancy.id);
        return true;
      }
      return false;
    });
    dispatch({type: actionType, vacancies: uniqueVacancies});
  } catch (e) {
    if (axios.isCancel(e)) return;
    if (e instanceof AxiosError) {
      const code = e.code ?? null;
      if (code) errors.add(code);
    }
  } finally {
    if (errors.size > 0) handleErrors(errors, alertsStore);
  }
};
