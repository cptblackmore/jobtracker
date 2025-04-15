import { sourcesRegistry } from '@entities/Vacancy';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, useMediaQuery, useTheme, Zoom } from '@mui/material';
import { typedEntries } from '@shared/lib';
import { StatusIndicator } from '@shared/ui';
import { VacancySource } from '@widgets/VacancySource';
import { StatusTableCellLink } from './StatusTableCellLink';
import { useSourcesStatus } from '../model/useSourcesStatus';

export const SourcesStatusTable: React.FC = () => {
  const { statuses } = useSourcesStatus();

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <TableContainer>
      <Table aria-label='Таблица статуса источников вакансий' >
        <TableBody sx={{'& > :last-child td, & > :last-child th': {borderBottom: 0}}} >
          {typedEntries(sourcesRegistry).map(([source, config], index) => {
            const status = statuses[source];
            const statusLabel = 
              status === 'success' ? 'Источник работает' :
              status === 'pending' ? 'Источник проверяется' : 'Источник недоступен';

            return (
              <Tooltip
                key={index}
                title={isSmUp ? `Перейти на ${config.url.frontendDomain}` : ''}
                followCursor
                TransitionComponent={Zoom}
                PopperProps={{
                  modifiers: [{name: 'offset', options: {offset: [0, 10]}}]
                }}
              >
                <TableRow 
                  hover
                  tabIndex={-1}
                  sx={{
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    '&:has(a:focus)': {
                      bgcolor: (theme) => theme.palette.action.focus,
                    }
                  }}
                  onClick={() => window.open(config.url.frontendOrigin, '_blank', 'noopener,noreferrer')}
                >
                  <TableCell component='th' scope='row' width='100%' sx={{p: 0}} >
                    <StatusTableCellLink 
                      href={config.url.frontendOrigin}
                      role='link'
                      ariaLabel={`Перейти на источник ${config.url.frontendDomain}, Статус: ${statusLabel}`}
                    >
                      <VacancySource source={source} reverse size={isSmUp ? 1.3 : 1.1} gap={isMdUp ? 3 : 2} />
                    </StatusTableCellLink>
                  </TableCell>
                  <TableCell sx={{p: 0}} >
                    <StatusTableCellLink tabIndex={-1} href={config.url.frontendOrigin} >
                      <Box display='flex' justifyContent='flex-end' >
                        <StatusIndicator 
                          success={status === 'success'} 
                          pending={status === 'pending'} 
                          size={isSmUp ? 1 : 0.9} 
                        />
                      </Box>
                    </StatusTableCellLink>
                  </TableCell>
                </TableRow>
              </Tooltip>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
