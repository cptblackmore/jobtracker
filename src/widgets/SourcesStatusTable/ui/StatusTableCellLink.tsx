import { Link } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href: string;
}

export const StatusTableCellLink: React.FC<Props> = ({ children, href }) => {
  return (
    <Link
      href={href}
      rel='noopener noreferrer'
      target='_blank'
      sx={{display: 'block', textDecoration: 'none', p: 2}}
    >
      {children}
    </Link>
  );
}
