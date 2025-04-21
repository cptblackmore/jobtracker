import { Box, Button, CircularProgress, Divider, Grid2, LinearProgress, Paper, useMediaQuery, useTheme } from '@mui/material';
import { DeleteFavoritesModal } from './DeleteFavoritesModal';
import { useFavoritesActions } from '../model/useFavoritesActions';
import { observer } from 'mobx-react-lite';
import { AriaInformer, favoritesActionsElementsIds, VisuallyHiddenTypography } from '@shared/ui';

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
    ariaInformerTextRef,
    activeAction,
    handleDeleteFavorites, 
    handleDownloadFavorites, 
    handleExportFavorites, 
    handleImportFavorites,
    favoritesStore
  } = useFavoritesActions(clearDisplayedFavorites, resetDisplayedFavorites);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const buttons = [
    {
      text: 'Скачать TXT', 
      onClick: () => handleDownloadFavorites('txt'), 
      action: 'download-txt',
      disableOnLoading: true, 
      disableOnEmpty: true,
      ariaLabel: 'Скачать список избранных вакансий в формате TXT'
    },
    {
      text:'Скачать CSV', 
      onClick: () => handleDownloadFavorites('csv'), 
      action: 'download-csv',
      disableOnLoading: true, 
      disableOnEmpty: true,
      ariaLabel: 'Скачать список избранных вакансий в формате CSV'
    },
    {
      text: 'Экспорт', 
      onClick: handleExportFavorites, 
      action: 'export',
      disableOnLoading: false, 
      disableOnEmpty: true,
      ariaLabel: 'Экспортировать список избранных вакансий в JSON файле'
    },
    {
      text: 'Импорт', 
      onClick: handleImportFavorites, 
      action: 'import',
      disableOnLoading: false, 
      disableOnEmpty: false,
      ariaLabel: 'Импортировать список избранных вакансий из JSON файла',
      id: favoritesActionsElementsIds.importButton
    }
  ];

  return (
    <>
      <DeleteFavoritesModal 
        open={modalOpen} 
        setOpen={setModalOpen} 
        handleDeleteFavorites={handleDeleteFavorites} 
        favoritesStore={favoritesStore}  
      />
      <VisuallyHiddenTypography>{`Панель действий с избранными вакансиями, вакансий в избранном: ${favoritesStore.ids.length}`}</VisuallyHiddenTypography>
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
              aria-label='Удалить все избранные вакансии'
            >
              Удалить все
            </Button>
            <Divider orientation='vertical' flexItem />
            {buttons.map((button, i) => {
              const isActive = button.action === activeAction;
              const disabled = isActive || (button.disableOnLoading && isLoading) || button.disableOnEmpty && favoritesStore.ids.length === 0;

              return <Button
                fullWidth
                variant='contained'
                key={i}
                id={button.id}
                onClick={button.onClick}
                disabled={disabled}
                endIcon={isActive && <CircularProgress size={15} color='inherit' />}
                aria-label={button.ariaLabel}
              >
                {isActive ? 'Загрузка...' : button.text}
              </Button>
            })}
          </Box>
        ) : (
          <Grid2 container spacing={1} >
            {buttons.map((button, i) => {
              const isActive = button.action === activeAction;
              const disabled = isActive || (button.disableOnLoading && isLoading) || button.disableOnEmpty && favoritesStore.ids.length === 0;

              return <Grid2 size={6} key={i} >
                <Button
                  fullWidth
                  variant='contained'
                  size='small'
                  key={i}
                  id={button.id}
                  onClick={button.onClick}
                  disabled={disabled}
                  endIcon={isActive && <CircularProgress size={15} color='inherit' />}
                  aria-label={button.ariaLabel}
                >
                  {isActive ? 'Загрузка...' : button.text}
                </Button>
              </Grid2>
            })}
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
                aria-label='Удалить все избранные вакансии'
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
      <AriaInformer forwardRef={ariaInformerTextRef} />
    </>
  );
});
