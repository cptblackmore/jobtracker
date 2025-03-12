import { Box, Button, Paper } from '@mui/material';
import { DeleteFavoritesModal } from './DeleteFavoritesModal';
import { Dispatch, SetStateAction } from 'react';
import { useFavoritesActions } from '../model/useFavoritesActions';

interface Props {
  ids: string[];
  setIds: Dispatch<SetStateAction<string[]>>
}

export const FavoritesActions: React.FC<Props> = ({ ids, setIds }) => {
  const { open, setOpen, handleDeleteFavorites } = useFavoritesActions(ids, setIds);

  return (
    <>
      <DeleteFavoritesModal open={open} setOpen={setOpen} handleDeleteFavorites={handleDeleteFavorites} />
      <Paper 
        sx={{ p: 2, borderRadius: 2, boxShadow: 2, mb: 2 }}
      >
        <Box display='flex' gap={2} >
          <Button disabled={ids.length === 0} variant='outlined' color='error' onClick={() => setOpen(true)} >Удалить все вакансии</Button>
          <Button disabled={ids.length === 0} variant='outlined' >Скачать в TXT</Button>
        </Box>
      </Paper>
    </>
  );
}
