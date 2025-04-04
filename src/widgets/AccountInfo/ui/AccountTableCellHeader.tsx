import { TableCell, useMediaQuery, useTheme } from '@mui/material';

interface Props {
  children: React.ReactNode
}

export const AccountTableCellHeader: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <TableCell 
      component='th' 
      scope='row' 
      sx={(theme) => ({
        whiteSpace: isSmUp ? 'nowrap' : 'wrap', 
        width: isSmUp ? '1px' : '100%', 
        pl: 0, 
        pr: 2,
        fontSize: {
          xs: '0.8rem',
          sm: theme.typography.body1.fontSize
        }
      })}
    >
      {children}
    </TableCell>
  );
}
