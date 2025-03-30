import { Box, Button, Container } from '@mui/material';
import { AuthContext } from '@shared/model';
import { useContext } from 'react';
import { CtaTitle } from './CtaTitle';

export const RegistrationSection: React.FC = () => {
  const { authStore } = useContext(AuthContext);

  return (
    <Box
      component='section'
      sx={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Container maxWidth='sm'>
        <CtaTitle 
          title='Заведите аккаунт и избранные вакансии будут  доступны с любого устройства'
        />
        <Button 
          variant='contained' 
          size='large' 
          color='secondary'
          onClick={() => authStore.setModalOpen(true, 'registration')}
        >
          Пройти регистрацию
        </Button>
      </Container>
    </Box>
  );
}
