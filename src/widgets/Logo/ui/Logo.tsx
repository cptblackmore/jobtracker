import { Link, Typography as T, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { LogoIcon } from '@shared/ui';

interface Props {
  iconSize?: string;
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Logo: React.FC<Props> = ({ iconSize='1.3em', titleSize='h6' }) => {
  const theme = useTheme();

  return (
    <Link 
      component={RouterLink}
      to='/home'
      sx={{display: 'flex', alignItems: 'center', gap: 1}} 
    >
      <LogoIcon size={iconSize} color={theme.palette.primary.contrastText} />
      <T
        variant={titleSize}
        noWrap
        sx={{
          mr: 1,
          display: 'flex',
          fontFamily: 'Space mono, monospace',
          fontWeight: 700,
          letterSpacing: '.1em',
          color: (theme) => theme.palette.primary.contrastText,
          transition: 'color 0.3s',
          textDecoration: 'none',
          paddingBottom: '0.2em'
        }}
      >
        jobtracker
      </T>
    </Link>
  );
}
