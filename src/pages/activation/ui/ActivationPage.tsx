import { Box, Card, Container } from '@mui/material';
import React from 'react';
import { Header } from '@widgets/Header';
import { containerStyles } from './styles';
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
      <Container maxWidth='lg' sx={containerStyles} >
        <Box 
          maxWidth='md'
          margin='auto'
          paddingTop='2em'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Card sx={{ width: '100%', paddingX: '1em', boxShadow: 3 }} >
            <ActivationLinkStatus success={success} errorCode={errorCode} />
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
