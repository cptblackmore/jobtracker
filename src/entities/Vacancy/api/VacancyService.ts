import axios, { AxiosError } from 'axios'
import { HHParams, SuperjobParams, TrudvsemParams } from './types/Params';

export class VacancyService {
  static async getSuperjob(params: SuperjobParams, signal: AbortSignal) {
    const response = await axios.get('http://localhost:3001/api/superjob/vacancies/', {
      params,
      signal
    });
    return response.data.objects;  
  }

  static async getSuperjobById(id: string, signal: AbortSignal) {
    const response = await axios.get('http://localhost:3001/api/superjob/vacancies/' + id, { signal });
    if (!response.data?.id) throw new AxiosError('Vacancy not found', 'FAVORITES_NOT_FOUND');
    return response.data;
  }
  
  static async getHH(params: HHParams, signal: AbortSignal) {
    const response = await axios.get('http://localhost:3001/api/hh/vacancies', {
      params,
      signal
    });
    return response.data.items;
  }
  static async getHHById(id: string, signal: AbortSignal) {
    const response = await axios.get('http://localhost:3001/api/hh/vacancies/' + id, { signal });
    return response.data;
  }
  
  static async getTrudvsem(params: TrudvsemParams, signal: AbortSignal) {
    const response = await axios.get('https://opendata.trudvsem.ru/api/v1/vacancies', {
      params,
      signal
    });
    return response.data.results.vacancies;
  }
  
  static async getTrudvsemById(companyId: string, id: string, signal: AbortSignal) {
    const response = await axios.get(`https://opendata.trudvsem.ru/api/v1/vacancies/vacancy/${companyId}/${id}`, { signal });
    if (!response.data.results?.vacancies) throw new AxiosError('Vacancy not found', 'FAVORITES_NOT_FOUND');
    return response.data.results.vacancies[0].vacancy;
  }
}
