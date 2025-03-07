import axios from 'axios'
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
    return await axios.get('http://localhost:3001/api/superjob/vacancies/' + id, { signal });
  }

  static async getSuperjobByIds(ids: string[], signal: AbortSignal) {
    return await axios.get('http://localhost:3001/api/superjob/vacancies/?' + ids.map((el, i) => {
      return `ids[${i}]=${el}`
    }).join('&'), { signal });
  }
  
  static async getHH(params: HHParams, signal: AbortSignal) {
    const response = await axios.get('http://localhost:3001/api/hh/vacancies', {
      params,
      signal
    });
    return response.data.items;
  }

  static async getHHById(id: string, signal: AbortSignal) {
    return await axios.get('http://localhost:3001/api/hh/vacancies/' + id, { signal });
  }
  
  static async getTrudvsem(params: TrudvsemParams, signal: AbortSignal) {
    const response = await axios.get('https://opendata.trudvsem.ru/api/v1/vacancies', {
      params,
      signal
    });
    return response.data.results.vacancies;
  }
  
  static async getTrudvsemById(companyId: string, id: string, signal: AbortSignal) {
    return await axios.get(`https://opendata.trudvsem.ru/api/v1/vacancies/vacancy/${companyId}/${id}`, { signal });
  }
}
