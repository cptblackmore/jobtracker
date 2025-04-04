import { Box, Button, CircularProgress, Divider, Grid2, LinearProgress, Paper, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const buttons = [
    {text: isLoading ? 'Загрузка...' : 'Скачать TXT', onClick: () => handleDownloadFavorites('txt'), disableOnLoading: true, disableOnEmpty: true},
    {text: isLoading ? 'Загрузка...' : 'Скачать CSV', onClick: () => handleDownloadFavorites('csv'), disableOnLoading: true, disableOnEmpty: true},
    {text: 'Экспорт', onClick: handleExportFavorites, disableOnLoading: false, disableOnEmpty: true},
    {text: 'Импорт', onClick: handleImportFavorites, disableOnLoading: false, disableOnEmpty: false},
  ];

  return (
    <>
      <DeleteFavoritesModal open={modalOpen} setOpen={setModalOpen} handleDeleteFavorites={handleDeleteFavorites} />
      <Paper 
        sx={{ p: isSmUp ? 2 : 1, borderRadius: 2, boxShadow: 2, mb: 2 }}
      >
        {isSmUp ? (
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
            {buttons.map((button, i) => (
              <Button
                fullWidth
                variant='contained'
                key={i}
                onClick={button.onClick}
                disabled={button.disableOnLoading ? isLoading || (button.disableOnEmpty && favoritesStore.ids.length === 0) : (button.disableOnEmpty && favoritesStore.ids.length === 0)}
                endIcon={button.disableOnLoading && isLoading && <CircularProgress size={15} color='inherit' />}
              >
                {button.text}
              </Button>
            ))}
          </Box>
        ) : (
          <Grid2 container spacing={1} >
            {buttons.map((button, i) => (
              <Grid2 size={6} key={i} >
                <Button
                  fullWidth
                  variant='contained'
                  size='small'
                  key={i}
                  onClick={button.onClick}
                  disabled={button.disableOnLoading ? isLoading || (button.disableOnEmpty && favoritesStore.ids.length === 0) : (button.disableOnEmpty && favoritesStore.ids.length === 0)}
                  endIcon={button.disableOnLoading && isLoading && <CircularProgress size={15} color='inherit' />}
                >
                  {button.text}
                </Button>
              </Grid2>
            ))}
            <Grid2 size={12} >
              <Divider sx={{my: 1}} />
            </Grid2>
            <Grid2 size={12} >
              <Button 
                fullWidth 
                disabled={favoritesStore.ids.length === 0} 
                variant='outlined' 
                size='small'
                color='error' 
                onClick={() => setModalOpen(true)} 
              >
                Удалить все
              </Button>
            </Grid2>
          </Grid2>
        )}
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
