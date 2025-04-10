import { MenuItem } from '@mui/material';
import { PagesContext } from '@shared/config';
import { AuthContext } from '@shared/model';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  handleCloseMenu: () => void;
  onClose?: () => void
}

export const AccountMenuItems: React.FC<Props> = ({ handleCloseMenu, onClose }) => {
  const { authStore } = useContext(AuthContext);
  const navigate = useNavigate();
  const { currentPage, pages } = useContext(PagesContext);

  return (
    [
      <MenuItem 
        selected={currentPage?.id === pages.account.id} 
        key={pages.account.id} 
        onClick={() => {handleCloseMenu(); 
        navigate(pages.account.path)}} 
      >
        {pages.account.name}
      </MenuItem>,
      <MenuItem 
        key='logout' 
        onClick={() => {
          handleCloseMenu(); 
          authStore.logout(); 
          if (onClose) onClose()
        }} 
      >
        Выход
      </MenuItem>
    ]
  )
}
