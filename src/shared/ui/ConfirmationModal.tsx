import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  handleConfirm: () => void;
  confirmButtonText?: string;
  severity?: 'warning' | 'error';
}

export const ConfirmationModal: React.FC<Props> = ({ open, setOpen, children, handleConfirm, confirmButtonText='ОК', severity='warning' }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Внимание!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => setOpen(false)}>Отмена</Button>
        <Button variant='outlined' color={severity} onClick={handleConfirm} >{confirmButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
}
