import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { StatusCircle } from './StatusCircle';

interface Props {
  success: boolean;
  pending?: boolean;
}

export const StatusIndicator: React.FC<Props> = ({ success, pending }) => {
  if (pending) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }} >
        <CircularProgress size={16} />
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} >
      <>
        <Typography component='span' variant='body2' sx={{color: (theme) => theme.palette[success ? 'success' : 'error'].main}} >
          {success ? 'ОК' : 'НЕТ'}
        </Typography>
        <StatusCircle success={success} />
      </>
    </Box>
  );
};
