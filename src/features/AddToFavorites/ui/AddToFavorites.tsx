import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Vacancy } from "@entities/Vacancy";
import { ToggleIconButton } from "@shared/ui";
import { useState } from "react";

interface Props {
  data: Vacancy;
}

export const AddToFavorites: React.FC<Props> = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(data.isFavorite); // TODO Make global favorites state

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
