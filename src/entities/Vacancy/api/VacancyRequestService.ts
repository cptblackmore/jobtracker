import axios from 'axios'
import { HHParams, SuperjobParams, TrudvsemParams } from './types/Params';

export class VacancyRequestService {
  static async getSuperjob(params: SuperjobParams) {
    const response = await axios.get('/superjob/2.0/vacancies/', {
      params,
      headers: {
        'X-Api-App-Id': 'v3.r.127820309.b68cc20ac962d5436d1f0f980e84fc6c604d5ded.c1c4d1a9f2ba2dc80ce328f4808fbe72d97346dd'
      }
    });
      console.log("🚀 ~ VacancyRequestService ~ getSuperjob ~ params:", params)
    return response.data.objects;  
  }
  
  static async getHH(params: HHParams) {
    const response = await axios.get('http://localhost:3001/api/hh/vacancies', {
      params
    });
      console.log("🚀 ~ VacancyRequestService ~ getHH ~ params:", params)
    return response.data.items;
  }

  static async getTrudvsem(params: TrudvsemParams) {
    const response = await axios.get('https://opendata.trudvsem.ru/api/v1/vacancies', {
      params
    });
      console.log("🚀 ~ VacancyRequestService ~ getTrudvsem ~ params:", params)
    return response.data.results.vacancies;
  }
}
