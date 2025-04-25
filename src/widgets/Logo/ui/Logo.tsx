import { Link, Typography as T, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { LogoIcon } from '@shared/ui';
import { useContext } from 'react';
import { PagesContext } from '@shared/config';

interface Props {
  id?: string;
  iconSize?: string;
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Logo: React.FC<Props> = ({ id, iconSize='1.3em', titleSize='h6' }) => {
  const theme = useTheme();
  const { currentPage, pages } = useContext(PagesContext);

  return (
    <Link 
      id={id}
      component={RouterLink}
      to={pages.home.path}
      sx={{display: 'flex', alignItems: 'center', gap: 1}}
      aria-label='Перейти на главную страницу'
      aria-current={currentPage === pages.home ? 'page' : undefined}
      title='Логотип JobTracker'
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
