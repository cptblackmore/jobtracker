import { FavoriteBorder } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Typography as T } from '@mui/material';

export const EmptyFavoritesListMessage: React.FC = () => {
  return (
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
  );
}
