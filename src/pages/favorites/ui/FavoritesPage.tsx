import { Box, Container, Typography as T } from "@mui/material";
import { Favorite } from '@mui/icons-material';
import { Header } from "@widgets/Header";
import { FavoritesContext, getFavorites } from "@features/Favorites";
import { FavoritesList } from "@widgets/VacancyList/ui/FavoritesList";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

export const FavoritesPage: React.FC = observer(() => {
  const [savedVacancyIds, setSavedVacancyIds] = useState(getFavorites());
  const { favoritesStore } = useContext(FavoritesContext);

  useEffect(() => {
    if (favoritesStore.isSynced) {
      setSavedVacancyIds(getFavorites());
    }
  }, [favoritesStore.isSynced]);

  return (
    <Box>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ padding: 3 }}>
          <T variant="h4" gutterBottom display='flex' alignItems='center' justifyContent='center' >
            Понравившиеся вакансии&nbsp;
            <Favorite color="primary" sx={{ mr: 1 }} fontSize="large" />
          </T>
          {savedVacancyIds.length > 0 ? (
            <FavoritesList ids={savedVacancyIds} />
          ) : (
            <T variant="body1" color="text.secondary" >
              У вас пока нет сохранённых вакансий.
            </T>
          )}
        </Box>
      </Container>
    </Box>
  );
});
