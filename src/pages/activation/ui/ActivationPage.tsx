import { Box, Card, CardContent, Container, Divider, Typography as T } from '@mui/material';
import React from 'react';
import { Nav } from '@widgets/Nav';
import { Navigate, useLocation } from 'react-router';
import { ActivationMessages } from './ActivationMessages';

export const ActivationPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code') ?? '';

  if (!code) {
    return <Navigate to='/' replace />;
  }

  return (
    <Box>
      <Nav />
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
              <ActivationMessages code={code} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
