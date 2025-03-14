import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteFavorites: () => void;
}

export const DeleteFavoritesModal: React.FC<Props> = ({ open, setOpen, handleDeleteFavorites }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Внимание!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите удалить все избранные вакансии?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => setOpen(false)}>Отмена</Button>
        <Button variant='outlined' color='error' onClick={handleDeleteFavorites} >Удалить</Button>
      </DialogActions>
    </Dialog>
  );
}
