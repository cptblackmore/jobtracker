import { Box, Card, CardContent, Container } from '@mui/material';
import React from 'react';
import { Nav } from '@widgets/Nav';
import { Navigate, useLocation } from 'react-router';
import { PageTitle } from '@widgets/PageTitle';
import { ActivationMessage } from '@widgets/ActivationMessage';

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
      <Container maxWidth='md' >
        <Box my={4} >
          <PageTitle title='Активация аккаунта' />
          <Card>
            <CardContent>
              <ActivationMessage code={code} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
