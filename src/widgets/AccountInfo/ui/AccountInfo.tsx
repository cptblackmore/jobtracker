import { Box, CardContent, CardHeader, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableRow } from '@mui/material';
import { useContext } from 'react';
import { FavoritesContext } from '@features/Favorites';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { CardHeaderTitle, StatusIndicator } from '@shared/ui';
import { AccountTableCellHeader } from './AccountTableCellHeader';

export const AccountInfo: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);
  const { favoritesStore } = useContext(FavoritesContext);

  return (
    <Box flexGrow={2} >
      <CardHeader 
        title={
          <CardHeaderTitle title='Общая информация' />
        }
      />
      <CardContent sx={{'&:last-child': {pb: 2}}} >
        <TableContainer>
          <Table 
            sx={{
              [`& .${tableCellClasses.root}`]: {borderBottom: 'none', py: 0.5},
            }}
          >
            <TableBody>
              <TableRow>
                <AccountTableCellHeader>E-mail:</AccountTableCellHeader>
                <TableCell sx={{px:0}} >{authStore.user.email}</TableCell>
              </TableRow>
              <TableRow>
                <AccountTableCellHeader>Статус синхронизации:</AccountTableCellHeader>
                <TableCell sx={{px:0}} >
                  <StatusIndicator success={authStore.user.isActivated} />
                </TableCell>
              </TableRow>
              <TableRow>
                <AccountTableCellHeader>Количество сохранённых вакансий:</AccountTableCellHeader>
                <TableCell sx={{color: (theme) => theme.palette.info.main, fontWeight: 'bold', px: 0}}>
                  {authStore.user.isActivated ? favoritesStore.ids.length : 0}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Box>
  );
});
