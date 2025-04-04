import { alpha, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen={!isSmUp}
      sx={{
        '& .MuiDialog-paper': {
          px: isSmUp ? 0 : 2,
          py: isSmUp ? 0 : 4,
          ...(!isSmUp && {
            backgroundColor: alpha(theme.palette.background.default, 0.95),
            backdropFilter: 'blur(1px)'
          })
        }
      }}
    >
      <DialogTitle>Внимание!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ 
          flexDirection: !isSmUp ? 'column' : 'row', 
          gap: 1, 
          p: !isSmUp ? 2 : 3,
          '& > :not(:first-of-type)': {ml: 0}
        }}
      >
        <Button fullWidth={!isSmUp} variant='contained' onClick={() => setOpen(false)}>Отмена</Button>
        <Button fullWidth={!isSmUp} variant='outlined' color={severity} onClick={handleConfirm} >{confirmButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
}
