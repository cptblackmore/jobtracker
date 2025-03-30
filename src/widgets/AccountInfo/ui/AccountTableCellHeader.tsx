import { TableCell } from '@mui/material';

interface Props {
  children: React.ReactNode
}

export const AccountTableCellHeader: React.FC<Props> = ({ children }) => {
  return (
    <TableCell component='th' scope='row' sx={{whiteSpace: 'nowrap', width: '1px', pl: 0, pr: 2}} >
      {children}
    </TableCell>
  );
}
