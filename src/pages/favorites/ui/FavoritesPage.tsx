import { Box, Container, Typography as T } from "@mui/material";
import { Favorite } from '@mui/icons-material';
import { Header } from "@widgets/Header";
import { getFavorites } from "@features/Favorites";
import { FavoritesList } from "@widgets/VacancyList/ui/FavoritesList";

export const FavoritesPage: React.FC = () => {
  const pages: Record<string, [string, string]> = {
    home: ['Главная', '/home'],
    feed: ['Вакансии', '/feed'],
    favorites: ['Избранное', '/favorites']
  }; // TODO Replace this with context or something

  const savedVacancyIds = getFavorites();

  return (
    <Box>
      <Header pages={pages} />
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
};
