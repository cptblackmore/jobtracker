import { Box, Button, Container } from '@mui/material';
import { Typography as T } from '@mui/material';
import { AuthContext } from '@shared/model';
import { useContext } from 'react';

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
        <T component='h2' variant='h5' mb={3} >
          Заведите аккаунт и избранные вакансии будут  доступны с любого устройства
        </T>
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
