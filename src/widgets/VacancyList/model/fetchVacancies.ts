import { getVacancies, Vacancy, VacancyParams } from '@entities/Vacancy';
import { AlertsStore } from '@shared/model';
import axios, { AxiosError } from 'axios';
import { MutableRefObject } from 'react';
import { handleErrors } from './handleErrors';

export const fetchVacancies = async (
  params: VacancyParams,
  vacancyIds: MutableRefObject<Set<string>>,
  signal: AbortSignal,
  alertsStore: AlertsStore
): Promise<Array<Vacancy> | null> => {
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
    return uniqueVacancies;
  } catch (e) {
    if (axios.isCancel(e)) {
      throw e;
    };
    if (e instanceof AxiosError) {
      const code = e.code ?? null;
      if (code) errors.add(code);
    }
    return null;
  } finally {
    if (errors.size > 0) handleErrors(errors, alertsStore);
  }
};
