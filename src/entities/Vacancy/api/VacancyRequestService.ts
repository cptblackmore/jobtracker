import axios, { AxiosError } from 'axios'
import { HHParams, SuperjobParams, TrudvsemParams } from './types/Params';

export class VacancyRequestService {
  static async getSuperjob(params: SuperjobParams) {
    const response = await axios.get('http://localhost:3001/api/superjob/vacancies/', {
      params
    });
    return response.data.objects;  
  }

  static async getSuperjobById(id: string, signal: AbortSignal) {
    const response = await axios.get('http://localhost:3001/api/superjob/vacancies/' + id, { signal });
    console.log('test');
    if (!response.data?.id) throw new AxiosError('Vacancy not found', 'FAVORITES_NOT_FOUND');
    return response.data;
  }
  
  static async getHH(params: HHParams) {
    const response = await axios.get('http://localhost:3001/api/hh/vacancies', {
      params
    });
    return response.data.items;
  }
  static async getHHById(id: string, signal: AbortSignal) {
    const response = await axios.get('http://localhost:3001/api/hh/vacancies/' + id, { signal });
    return response.data;
  }
  
  static async getTrudvsem(params: TrudvsemParams) {
    const response = await axios.get('https://opendata.trudvsem.ru/api/v1/vacancies', {
      params
    });
    return response.data.results.vacancies;
  }
  
  static async getTrudvsemById(companyId: string, id: string, signal: AbortSignal) {
    const response = await axios.get(`https://opendata.trudvsem.ru/api/v1/vacancies/vacancy/${companyId}/${id}`, { signal });
    if (!response.data.results?.vacancies) throw new AxiosError('Vacancy not found', 'FAVORITES_NOT_FOUND');
    return response.data.results.vacancies[0].vacancy;
  }
}
