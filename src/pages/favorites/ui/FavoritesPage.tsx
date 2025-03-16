  import { Box, Container, Typography as T } from '@mui/material';
  import { FavoriteBorder } from '@mui/icons-material';
  import { Nav } from '@widgets/Nav';
  import { FavoritesContext } from '@features/Favorites';
  import { FavoritesList } from '@widgets/FavoritesList';
  import { useContext, useEffect, useState } from 'react';
  import { observer } from 'mobx-react-lite';
  import { FavoritesActions } from '@widgets/FavoritesActions/ui/FavoritesActions';

  export const FavoritesPage: React.FC = observer(() => {
    const { favoritesStore } = useContext(FavoritesContext);
    const [savedVacancyIds, setSavedVacancyIds] = useState<string[]>(favoritesStore.favorites);

    useEffect(() => {
      if (favoritesStore.favorites.length > savedVacancyIds.length) {
        setSavedVacancyIds(favoritesStore.favorites);
      }
    }, [favoritesStore.favorites]);

    return (
      <Box>
        <Nav />
        <Container maxWidth="md">
          <Box sx={{ padding: 3 }}>
            <T variant="h4" gutterBottom display='flex' alignItems='center' justifyContent='center' >
              Избранные вакансии
            </T>
            {favoritesStore.favorites.length > 0 && (
              <T variant='body1' color='text.secondary' display='flex' ml={2} justifyContent='start' >
                Количество: {favoritesStore.favorites.length}
              </T>
            )}
            <FavoritesActions ids={savedVacancyIds} setIds={setSavedVacancyIds} />
            {savedVacancyIds.length > 0 ? (
              <FavoritesList ids={savedVacancyIds} />
            ) : (
              <Box>
                <T variant='body1' color='text.secondary' display='flex' mt={5} justifyContent='center' >
                  У вас пока нет избранных вакансий.
                </T>
                <T variant='body1' color='text.secondary' display='flex' mt={3} justifyContent='center' >
                  Чтобы добавить вакансию в избранные, нажмите на иконку <FavoriteBorder sx={{mx: 0.5}} /> в карточке вакансии
                </T>
                <T variant='body1' color='text.secondary' display='flex' mt={1} justifyContent='center' >
                  или импортируйте вакансии из JSON файла.
                </T>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    );
  });
