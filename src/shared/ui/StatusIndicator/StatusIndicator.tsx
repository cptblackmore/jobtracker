import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { StatusCircle } from './StatusCircle';

interface Props {
  success: boolean;
  pending?: boolean;
  size?: number;
}

export const StatusIndicator: React.FC<Props> = ({ success, pending, size=1 }) => {
  if (pending) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }} >
        <CircularProgress size={16 * size} color='warning' />
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} >
      <>
        <Typography 
          component='span' 
          variant='body2' 
          sx={(theme) => ({
            color: theme.palette[success ? 'success' : 'error'].main,
            fontSize: `${0.9 * size}rem`
          })}
        >
          {success ? 'ОК' : 'НЕТ'}
        </Typography>
        <StatusCircle success={success} size={size} />
      </>
    </Box>
  );
};
