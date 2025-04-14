import { Clear } from '@mui/icons-material';
import { IconButton, InputAdornment, SxProps, Theme } from '@mui/material';

interface Props {
  onClear: () => void
  visible: boolean
  iconSize?: { xs: string; sm: string }
  sx?: SxProps<Theme>
}

export const ClearAdornment: React.FC<Props> = ({ onClear, visible, iconSize = { xs: '1rem', sm: '1.3rem' }, sx }) => {
  if (!visible) return null;

  return (
    <InputAdornment position='end' sx={sx} >
      <IconButton
        onClick={onClear}
        size='small'
        edge='end'
      >
        <Clear sx={{fontSize: iconSize}} />
      </IconButton>
    </InputAdornment>
  );
}
