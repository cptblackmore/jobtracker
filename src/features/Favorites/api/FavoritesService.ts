import { FavoritesResponse } from "@features/Favorites";
import { $api } from "@shared/api";
import { AxiosResponse } from "axios";

export class FavoritesService {
  static async updateFavorites(
    favorites: FavoritesResponse["favorites"],
  ): Promise<AxiosResponse<FavoritesResponse>> {
    return $api.put<FavoritesResponse>("/favorites", { favorites });
  }

  static async synchronizeFavorites(
    favorites: FavoritesResponse["favorites"],
  ): Promise<AxiosResponse<FavoritesResponse>> {
    return $api.post<FavoritesResponse>("/favorites", { favorites });
  }
}
