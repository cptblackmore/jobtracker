import React from 'react'
import { Box } from '@mui/material'

interface Props {
  id?: string;
  children?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

export const AriaInformer: React.FC<Props> = ({
  id,
  children = '',
  'aria-live': ariaLive='polite'
}) => {
  return (
    <Box
      id={id}
      sx={{
        position: 'absolute',
        width: 1,
        height: 1,
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
        border: 0,
        padding: 0,
        margin: -1,
      }}
      aria-live={ariaLive}
      aria-atomic="true"
    >
      {children}
    </Box>
  )
}
