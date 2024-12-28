import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Vacancy } from "@entities/Vacancy";
import { ToggleIconButton } from "@shared/ui";
import { useEffect, useState } from "react";
import { isVacancyFavorite } from "../model/isVacancyFavorite";
import { addToFavorites } from "../model/addToFavorites";
import { deleteFromFavorites } from "../model/deleteFromFavorites";

interface Props {
  data: Vacancy;
}

export const FavoriteIconButton: React.FC<Props> = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(isVacancyFavorite(data.id));
  useEffect(() => {
    if (isFavorite) {
      addToFavorites(data.id);
    } else {
      deleteFromFavorites(data.id);
    }
  }, [isFavorite])

  return (
    <ToggleIconButton
      isToggled={isFavorite}
      onToggle={() => setIsFavorite(!isFavorite)}
      defaultIcon={<FavoriteBorder />}
      toggledIcon={<Favorite color='primary' />}
      defaultTooltip='Добавить в избранное'
      toggledTooltip='Удалить из избранного'
    />
  );
}
