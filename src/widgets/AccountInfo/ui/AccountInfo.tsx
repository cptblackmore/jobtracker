import { Box, CardContent, CardHeader, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableRow, useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';
import { FavoritesContext } from '@features/Favorites';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { CardHeaderTitle, StatusIndicator } from '@shared/ui';
import { AccountTableCellHeader } from './AccountTableCellHeader';

export const AccountInfo: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);
  const { favoritesStore } = useContext(FavoritesContext);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box flexGrow={2} >
      <CardHeader 
        title={
          <CardHeaderTitle title='Общая информация' />
        }
        sx={{pb: {xs: 1, sm: 2}}}
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
                <TableCell 
                  sx={(theme) => ({
                    px: 0,
                    fontSize: {
                      xs: '0.8rem',
                      sm: theme.typography.body1.fontSize
                    }
                  })}
                >{authStore.user.email}</TableCell>
              </TableRow>
              <TableRow>
                <AccountTableCellHeader>Статус синхронизации:</AccountTableCellHeader>
                <TableCell sx={{px:0}} >
                  <StatusIndicator success={authStore.user.isActivated} size={isSmUp ? 1 : 0.9} />
                </TableCell>
              </TableRow>
              <TableRow>
                <AccountTableCellHeader>Кол-во сохранённых вакансий:</AccountTableCellHeader>
                <TableCell
                  sx={(theme) => ({
                    color: theme.palette.info.main, 
                    fontWeight: 'bold',
                    px: 0,
                    fontSize: {
                      xs: '0.8rem',
                      sm: theme.typography.body1.fontSize
                    }
                  })}
                >
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
