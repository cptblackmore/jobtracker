import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Vacancy } from "@entities/Vacancy";
import { ToggleIconButton } from "@shared/ui";
import { useState } from "react";
import { isVacancyFavorite } from "../model/isVacancyFavorite";
import { addToFavorites } from "../model/addToFavorites";
import { deleteFromFavorites } from "../model/deleteFromFavorites";

interface Props {
  data: Vacancy;
}

export const FavoriteIconButton: React.FC<Props> = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(isVacancyFavorite(data.id));
  function handleToggle() {
    if (isFavorite) {
      deleteFromFavorites(data.id);
      setIsFavorite(false);
    } else {
      addToFavorites(data.id);
      setIsFavorite(true);
    }
  }

  return (
    <ToggleIconButton
      isToggled={isFavorite}
      onToggle={handleToggle}
      defaultIcon={<FavoriteBorder />}
      toggledIcon={<Favorite color='primary' />}
      defaultTooltip='Добавить в избранное'
      toggledTooltip='Удалить из избранного'
    />
  );
}
