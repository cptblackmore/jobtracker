import { Box, Button, Container, SxProps } from '@mui/material';
import { AuthContext } from '@features/Auth';
import { useContext } from 'react';
import { CtaTitle } from './CtaTitle';

interface Props {
  sectionStyle: SxProps
}

export const RegistrationSection: React.FC<Props> = ({ sectionStyle }) => {
  const { authStore } = useContext(AuthContext);

  return (
    <Box
      component='section'
      sx={{minHeight: {xs: '90vh', md: '40vh'}, ...sectionStyle}}
    >
      <Container maxWidth='sm'>
        <CtaTitle 
          title='Заведите аккаунт и избранные вакансии будут доступны с любого устройства'
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
