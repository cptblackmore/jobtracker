import { Box, Card, CardContent, Container, Divider, Typography as T } from '@mui/material';
import React from 'react';
import { Header } from '@widgets/Header';
import { useLocation } from 'react-router';
import { ActivationLinkStatus } from './ActivationLinkStatus';

export const ActivationPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const success = params.get('success') === 'true';
  const errorCode = params.get('errorCode') || 'UNKNOWN_ERROR';

  return (
    <Box>
      <Header />
      <Container maxWidth='lg' >
        <Box 
          maxWidth='md'
          margin='auto'
          paddingTop='2em'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Card sx={{ width: '100%', paddingX: '1em', boxShadow: 3 }} >
            <CardContent>
              <T variant='h4' align='center' gutterBottom>
                Активация аккаунта
              </T>
              <Divider sx={{ marginY: '1em' }} />
              <ActivationLinkStatus success={success} errorCode={errorCode} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
