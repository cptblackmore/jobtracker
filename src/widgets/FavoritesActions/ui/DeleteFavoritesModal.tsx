import { FavoritesStore } from '@features/Favorites';
import { focusElementById } from '@shared/lib';
import { ConfirmationModal } from '@shared/ui';
import { Dispatch, SetStateAction } from 'react';
import { favoritesActionsElementsIds } from '../lib/favoritesActionsElementsIds';
import { observer } from 'mobx-react-lite';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteFavorites: () => void;
  favoritesStore: FavoritesStore;
}

export const DeleteFavoritesModal: React.FC<Props> = observer(({ open, setOpen, handleDeleteFavorites, favoritesStore }) => {
  return (
    <ConfirmationModal 
      open={open} 
      setOpen={setOpen} 
      confirmButtonText='Удалить'
      handleConfirm={handleDeleteFavorites}
      severity='error'
      onExited={() => favoritesStore.ids.length === 0 && focusElementById(favoritesActionsElementsIds.importButton)}
    >
      Вы уверены, что хотите удалить <b>все</b> избранные вакансии?
    </ConfirmationModal>
  );
});
