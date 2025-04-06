import { FavoritesContext } from '@features/Favorites';
import { Paper, Typography as T } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

export const FavoritesQuantity: React.FC = observer(() => {
  const { favoritesStore } = useContext(FavoritesContext);

  return (
    <Paper
      sx={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        py: 0.5,
        px: 2, 
        borderRadius: 2, 
        boxShadow: 2, 
        mb: 1
      }}
    >
      <T variant='body2' >
        Вакансий в избранном: 
      </T>
      <T variant='body2' color='primary' >
        {favoritesStore.ids.length}
      </T>
    </Paper>
  );
});
