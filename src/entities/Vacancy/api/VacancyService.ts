import axios, { AxiosResponse } from 'axios'
import { HHParams, SuperjobParams, TrudvsemParams } from './types/Params';
import { VacancySuperjob, VacancySuperjobMultipleResponse } from './types/VacancySuperjob';
import { VacancyHHById, VacancyHHMultipleResponse } from './types/VacancyHH';
import { VacancyTrudvsemResponse } from './types/VacancyTrudvsem';
import { sourcesRegistry } from '../model/sourcesRegistry';

export class VacancyService {
  private static PROXY_URL = import.meta.env.VITE_PROXY_URL;
  private static SUPERJOB_API_APP_ID = import.meta.env.VITE_SUPERJOB_API_APP_ID;

  static async getSuperjob(params: SuperjobParams, signal: AbortSignal): Promise<AxiosResponse<VacancySuperjobMultipleResponse>> {
    return await axios.get(
      this.PROXY_URL ? (this.PROXY_URL + '/superjob/vacancies/') : (sourcesRegistry.superjob.url.api + '/vacancies/'), 
      {
        params,
        signal,
        headers: {
          'X-Api-App-Id': this.SUPERJOB_API_APP_ID
        }
      }
    );
  }

  static async getSuperjobById(id: string, signal: AbortSignal): Promise<AxiosResponse<VacancySuperjob>> {
    return await axios.get(
      this.PROXY_URL ? (this.PROXY_URL + '/superjob/vacancies/' + id) : (sourcesRegistry.superjob.url.api + '/vacancies/' + id), 
      { 
        signal,
        headers: {
          'X-Api-App-Id': this.SUPERJOB_API_APP_ID
        }
      }
    );
  }

  static async getSuperjobByIds(ids: string[], signal: AbortSignal): Promise<AxiosResponse<VacancySuperjobMultipleResponse>> {
    return await axios.get(
      this.PROXY_URL ? (
        this.PROXY_URL + '/superjob/vacancies/?' + ids.map((el, i) => {
          return `ids[${i}]=${el}`
        }).join('&')
      ) : (
        sourcesRegistry.superjob.url.api + '/vacancies/?' + ids.map((el, i) => {
          return `ids[${i}]=${el}`
        }).join('&')
      ), 
      { 
        signal,
        headers: {
          'X-Api-App-Id': this.SUPERJOB_API_APP_ID
        }
      }
  );
  }
  
  static async getHH(params: HHParams, signal: AbortSignal): Promise<AxiosResponse<VacancyHHMultipleResponse>> {
    return await axios.get(
      this.PROXY_URL ? (this.PROXY_URL + '/hh/vacancies') : (sourcesRegistry.hh.url.api + '/vacancies'), 
      {
        params,
        signal
      }
    );
  }

  static async getHHById(id: string, signal: AbortSignal): Promise<AxiosResponse<VacancyHHById>> {
    return await axios.get(
      this.PROXY_URL ? (this.PROXY_URL + '/hh/vacancies/' + id) : (sourcesRegistry.hh.url.api + '/vacancies/' + id), 
      { signal }
    );
  }
  
  static async getTrudvsem(params: TrudvsemParams, signal: AbortSignal): Promise<AxiosResponse<VacancyTrudvsemResponse>> {
    return await axios.get(sourcesRegistry.trudvsem.url.api + '/vacancies', {
      params,
      signal
    });
  }
  
  static async getTrudvsemById(companyId: string, id: string, signal: AbortSignal): Promise<AxiosResponse<VacancyTrudvsemResponse>> {
    return await axios.get(sourcesRegistry.trudvsem.url.api + `/vacancies/vacancy/${companyId}/${id}`, { signal });
  }
}
