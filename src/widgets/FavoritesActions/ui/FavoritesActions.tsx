import { Box, Button, CircularProgress, Divider, LinearProgress, Paper } from '@mui/material';
import { DeleteFavoritesModal } from './DeleteFavoritesModal';
import { useFavoritesActions } from '../model/useFavoritesActions';
import { observer } from 'mobx-react-lite';

interface Props {
  clearDisplayedFavorites: () => void;
  resetDisplayedFavorites: () => void;
}

export const FavoritesActions: React.FC<Props> = observer(({ clearDisplayedFavorites, resetDisplayedFavorites }) => {
  const {
    modalOpen, 
    setModalOpen, 
    progress, 
    isLoading,
    handleDeleteFavorites, 
    handleDownloadFavorites, 
    handleExportFavorites, 
    handleImportFavorites,
    favoritesStore
  } = useFavoritesActions(clearDisplayedFavorites, resetDisplayedFavorites);

  return (
    <>
      <DeleteFavoritesModal open={modalOpen} setOpen={setModalOpen} handleDeleteFavorites={handleDeleteFavorites} />
      <Paper 
        sx={{ p: 2, borderRadius: 2, boxShadow: 2, mb: 2 }}
      >
        <Box display='flex' justifyContent='space-between' gap={2} >
          <Button 
            fullWidth 
            disabled={favoritesStore.ids.length === 0} 
            variant='outlined' 
            color='error' 
            onClick={() => setModalOpen(true)} 
          >
            Удалить все
          </Button>
          <Divider orientation='vertical' flexItem />
          <Button 
            fullWidth 
            disabled={favoritesStore.ids.length === 0 || isLoading}
            variant='contained' 
            onClick={() => handleDownloadFavorites('txt')}
            endIcon={isLoading && <CircularProgress size={15} color='inherit' />}
          >
            {isLoading ? 'Загрузка...' : 'Скачать TXT'}
          </Button>
          <Button 
            fullWidth 
            disabled={favoritesStore.ids.length === 0 || isLoading} 
            variant='contained' 
            onClick={() => handleDownloadFavorites('csv')}
            endIcon={isLoading && <CircularProgress size={15} color='inherit' />}
          >
            {isLoading ? 'Загрузка...' : 'Скачать CSV'}
          </Button>
          <Button 
            fullWidth 
            disabled={favoritesStore.ids.length === 0} 
            variant='contained' 
            onClick={handleExportFavorites}
          >
            Экспорт
          </Button>
          <Button 
            fullWidth 
            variant='contained' 
            onClick={handleImportFavorites}
          >
            Импорт
          </Button>
        </Box>
        {isLoading && (
          <Box
            sx={{mt: 2, width: '100%'}}
          >
            <LinearProgress variant='determinate' value={progress} color='secondary' />
          </Box>
        )}
      </Paper>
    </>
  );
});
