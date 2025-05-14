import axios, { AxiosResponse } from "axios";
import { Places } from "./types/Places";

export class PlacesService {
  private static baseURL = import.meta.env.VITE_API_URL + "/places";

  static async getPlaces(
    place: string,
    signal: AbortSignal,
  ): Promise<AxiosResponse<Places>> {
    return await axios.get(this.baseURL, { params: { place }, signal });
  }
}
