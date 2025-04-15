import { Link } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href: string;
  tabIndex?: number;
  role?: string;
  ariaLabel?: string;
}

export const StatusTableCellLink: React.FC<Props> = ({ children, href, tabIndex, role, ariaLabel }) => {
  return (
    <Link
      href={href}
      rel='noopener noreferrer'
      target='_blank'
      sx={{display: 'block', textDecoration: 'none', p: 2, ':focus': {outline: 'none'}}}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
