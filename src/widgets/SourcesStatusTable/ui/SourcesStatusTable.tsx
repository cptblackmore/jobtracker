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
      <Table>
        <TableBody sx={{'& > :last-child td, & > :last-child th': {borderBottom: 0}}} >
          {typedEntries(sourcesRegistry).map(([source, config], index) => {
            return (
              <Tooltip
                key={index} 
                title={isSmUp ? `Перейти на ${config.url.frontendDomain}` : ''}
                followCursor
                TransitionComponent={Zoom}
                PopperProps={{
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 10]
                      }
                    }
                  ]
                }}
              >
                <TableRow 
                  tabIndex={-1}
                  hover 
                  sx={{
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <TableCell component='th' scope='row' width='100%' sx={{p: 0}} >
                    <StatusTableCellLink href={config.url.frontendOrigin} >
                      <VacancySource source={source} reverse size={isSmUp ? 1.3 : 1.1} gap={isMdUp ? 3 : 2} />
                    </StatusTableCellLink>
                  </TableCell>
                  <TableCell sx={{p: 0}} >
                    <StatusTableCellLink href={config.url.frontendOrigin} >
                      <Box display='flex' justifyContent='flex-end' >
                        <StatusIndicator 
                          success={statuses[source] === 'success'} 
                          pending={statuses[source] === 'pending'} 
                          size={isSmUp ? 1 : 0.9} 
                        />
                      </Box>
                    </StatusTableCellLink>
                  </TableCell>
                </TableRow>
              </Tooltip>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
