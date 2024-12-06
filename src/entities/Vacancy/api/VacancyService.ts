import axios from 'axios'

export class VacancyService {
  static async getSuperjob(page = 0) {
    const response = await axios.get('/superjob/2.0/vacancies/', {
      params: {
        page,
        count: 10
      },
      headers: {
        'X-Api-App-Id': 'v3.r.127820309.b68cc20ac962d5436d1f0f980e84fc6c604d5ded.c1c4d1a9f2ba2dc80ce328f4808fbe72d97346dd'
      }
    });
    return response.data.objects;  
  }
  
  static async getHH(page = 0) {
    const response = await axios.get('http://localhost:3001/api/hh/vacancies', {
      params: {
        page,
        per_page: 10
      }
    });
    return response.data.items;
  }

  static async getTrudvsem(page = 0) {
    const response = await axios.get('https://opendata.trudvsem.ru/api/v1/vacancies', {
      params: {
        offset: page,
        limit: 10
      }
    });
    return response.data.results.vacancies;
  }
}
