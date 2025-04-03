import { ConfirmationModal } from '@shared/ui';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteFavorites: () => void;
}

export const DeleteFavoritesModal: React.FC<Props> = ({ open, setOpen, handleDeleteFavorites }) => {
  return (
    <ConfirmationModal 
      open={open} 
      setOpen={setOpen} 
      confirmButtonText='Удалить'
      handleConfirm={handleDeleteFavorites}
      severity='error'
    >
      Вы уверены, что хотите удалить <b>все</b> избранные вакансии?
    </ConfirmationModal>
  );
}
