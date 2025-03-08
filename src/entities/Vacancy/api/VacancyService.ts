import axios, { AxiosResponse } from 'axios'
import { HHParams, SuperjobParams, TrudvsemParams } from './types/Params';
import { VacancySuperjob, VacancySuperjobMultipleResponse } from './types/VacancySuperjob';
import { VacancyHHById, VacancyHHMultipleResponse } from './types/VacancyHH';
import { VacancyTrudvsemResponse } from './types/VacancyTrudvsem';

export class VacancyService {
  static async getSuperjob(params: SuperjobParams, signal: AbortSignal): Promise<AxiosResponse<VacancySuperjobMultipleResponse>> {
    return await axios.get('http://localhost:3001/api/superjob/vacancies/', {
      params,
      signal
    });
  }

  static async getSuperjobById(id: string, signal: AbortSignal): Promise<AxiosResponse<VacancySuperjob>> {
    return await axios.get('http://localhost:3001/api/superjob/vacancies/' + id, { signal });
  }

  static async getSuperjobByIds(ids: string[], signal: AbortSignal): Promise<AxiosResponse<VacancySuperjobMultipleResponse>> {
    return await axios.get('http://localhost:3001/api/superjob/vacancies/?' + ids.map((el, i) => {
      return `ids[${i}]=${el}`
    }).join('&'), { signal });
  }
  
  static async getHH(params: HHParams, signal: AbortSignal): Promise<AxiosResponse<VacancyHHMultipleResponse>> {
    return await axios.get('http://localhost:3001/api/hh/vacancies', {
      params,
      signal
    });
  }

  static async getHHById(id: string, signal: AbortSignal): Promise<AxiosResponse<VacancyHHById>> {
    return await axios.get('http://localhost:3001/api/hh/vacancies/' + id, { signal });
  }
  
  static async getTrudvsem(params: TrudvsemParams, signal: AbortSignal): Promise<AxiosResponse<VacancyTrudvsemResponse>> {
    return await axios.get('https://opendata.trudvsem.ru/api/v1/vacancies', {
      params,
      signal
    });
  }
  
  static async getTrudvsemById(companyId: string, id: string, signal: AbortSignal): Promise<AxiosResponse<VacancyTrudvsemResponse>> {
    return await axios.get(`https://opendata.trudvsem.ru/api/v1/vacancies/vacancy/${companyId}/${id}`, { signal });
  }
}
