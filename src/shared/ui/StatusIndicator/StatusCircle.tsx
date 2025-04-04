import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {filter: brightness(0.8)}
  50% {filter: brightness(1.3)}
  100% {filter: brightness(0.8)}
`;

interface Props {
  success: boolean;
  size: number;
}

export const StatusCircle: React.FC<Props> = ({ success, size }) => (
  <Box
    component='span'
    sx={{
      width: 16 * size,
      height: 16 * size,
      borderRadius: '50%',
      backgroundColor: (theme) => theme.palette[success ? 'success' : 'error'].main,
      animation: `${pulse} 2s infinite ease-in-out`,
      ml: 1 * size,
      display: 'inline-block',
    }}
  />
);
