import { Box, Card, CardContent, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import { Header } from '@widgets/Header';
import { containerStyles } from './styles';
import { useLocation } from 'react-router';
import { errorMessages } from '@shared/lib/errorMessages';

export const ActivationPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const success = params.get('success') === 'true';
  const errorMessage = errorMessages[params.get('errorCode') ?? 'UNKNOWN_ERROR'] ?? errorMessages.UNKNOWN_ERROR;

  return (
    <Box>
      <Header />
      <Container maxWidth='lg' css={containerStyles} >
        <Box maxWidth='md' paddingTop='1em' >
          <Card sx={{paddingLeft: '1em', paddingRight: '1em'}} >
            <CardContent>
              <Typography variant='h4' align='center' >Страница активации аккаунта</Typography>
              <Divider />
              {success ? (
                <Typography align='center' color='success' >Аккаунт успешно активирован</Typography>
              ) : (
                <Typography align='center' color='error' >{errorMessage}</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
