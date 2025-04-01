import axios, { AxiosResponse } from 'axios'
import { HHParams, SuperjobParams, TrudvsemParams } from './types/Params';
import { VacancySuperjob, VacancySuperjobMultipleResponse } from './types/VacancySuperjob';
import { VacancyHHById, VacancyHHMultipleResponse } from './types/VacancyHH';
import { VacancyTrudvsemResponse } from './types/VacancyTrudvsem';
import { sourcesRegistry } from '../model/sourcesRegistry';

export class VacancyService {
  private static baseURL = import.meta.env.VITE_API_URL + '/vacanciesProxy';
  private static SUPERJOB_API_APP_ID = import.meta.env.VITE_SUPERJOB_API_APP_ID;

  static async getSuperjob(params: SuperjobParams, signal: AbortSignal): Promise<AxiosResponse<VacancySuperjobMultipleResponse>> {
    return await axios.get(
      this.baseURL, 
      {
        params,
        signal,
        headers: {
          'X-Api-App-Id': this.SUPERJOB_API_APP_ID,
          'X-Target-Url': sourcesRegistry.superjob.url.api + '/vacancies/'
        }
      }
    );
  }

  static async getSuperjobById(id: string, signal: AbortSignal): Promise<AxiosResponse<VacancySuperjob>> {
    return await axios.get(
      this.baseURL, 
      { 
        signal,
        headers: {
          'X-Api-App-Id': this.SUPERJOB_API_APP_ID,
          'X-Target-Url': sourcesRegistry.superjob.url.api + '/vacancies/' + id
        }
      }
    );
  }

  static async getSuperjobByIds(ids: string[], signal: AbortSignal): Promise<AxiosResponse<VacancySuperjobMultipleResponse>> {
    return await axios.get(
      this.baseURL,
      { 
        signal,
        headers: {
          'X-Api-App-Id': this.SUPERJOB_API_APP_ID,
          'X-Target-Url': sourcesRegistry.superjob.url.api + '/vacancies/?' + ids.map((el, i) => `ids[${i}]=${el}`).join('&')
        }
      }
  );
  }
  
  static async getHH(params: HHParams, signal: AbortSignal): Promise<AxiosResponse<VacancyHHMultipleResponse>> {
    return await axios.get(
      this.baseURL, 
      {
        params,
        signal,
        headers: {
          'X-Target-Url': sourcesRegistry.hh.url.api + '/vacancies/'
        }
      }
    );
  }

  static async getHHById(id: string, signal: AbortSignal): Promise<AxiosResponse<VacancyHHById>> {
    return await axios.get(
      this.baseURL, 
      { 
        signal,
        headers: {
          'X-Target-Url': sourcesRegistry.hh.url.api + '/vacancies/' + id
        }
      }
    );
  }
  
  static async getTrudvsem(params: TrudvsemParams, signal: AbortSignal): Promise<AxiosResponse<VacancyTrudvsemResponse>> {
    return await axios.get(
      this.baseURL, 
      {
        params,
        signal,
        headers: {
          'X-Target-Url': sourcesRegistry.trudvsem.url.api + '/vacancies/'
        }
      }
    );
  }
  
  static async getTrudvsemById(companyId: string, id: string, signal: AbortSignal): Promise<AxiosResponse<VacancyTrudvsemResponse>> {
    return await axios.get(
      this.baseURL, 
      { 
        signal,
        headers: {
          'X-Target-Url': sourcesRegistry.trudvsem.url.api + `/vacancies/vacancy/${companyId}/${id}`
        }
      }
    );
  }
}
