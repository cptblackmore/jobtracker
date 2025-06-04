import { FavoritesResponse } from "@features/Favorites";
import { $api } from "@shared/api";
import { AxiosResponse } from "axios";

export class FavoritesService {
  static async updateFavorites(
    favorites: FavoritesResponse["favorites"],
  ): Promise<AxiosResponse<FavoritesResponse>> {
    return $api.put<FavoritesResponse>("/favorites/me", { favorites });
  }

  static async synchronizeFavorites(
    favorites: FavoritesResponse["favorites"],
  ): Promise<AxiosResponse<FavoritesResponse>> {
    return $api.patch<FavoritesResponse>("/favorites/me/sync", { favorites });
  }
}
