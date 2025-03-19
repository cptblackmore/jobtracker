import { Box, Typography as T } from '@mui/material';
import { useFavoritesList } from '../model/useFavoritesList';
import { VirtualizedVacancyList } from '@widgets/VacancyList';
import { useContext } from 'react';
import { FavoritesContext } from '@features/Favorites';
import { FavoritesActions } from '@widgets/FavoritesActions';
import { FavoriteBorder } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';

export const FavoritesList: React.FC = observer(() => {
  const { favoritesStore } = useContext(FavoritesContext);
  const { 
    vacancies, 
    isLoading, 
    page, setPage, 
    ids, 
    setIds 
  } = useFavoritesList(favoritesStore.favorites);

  return (
    <Box>
      {favoritesStore.favorites.length > 0 && (
        <T variant='body1' color='text.secondary' display='flex' ml={2} justifyContent='start' >
          Количество: {favoritesStore.favorites.length}
        </T>
      )}
      <FavoritesActions ids={ids} setIds={setIds} />
      {favoritesStore.favorites.length > 0 ? (
        <VirtualizedVacancyList 
          vacancies={vacancies}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
        />
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
  );
});
