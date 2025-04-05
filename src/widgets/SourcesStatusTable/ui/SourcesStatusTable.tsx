import { sourcesRegistry } from '@entities/Vacancy';
import { Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, useMediaQuery, useTheme, Zoom } from '@mui/material';
import { typedEntries } from '@shared/lib';
import { StatusIndicator } from '@shared/ui';
import { VacancySource } from '@widgets/VacancySource';
import { StatusTableCellLink } from './StatusTableCellLink';

export const SourcesStatusTable: React.FC = () => {
  // const [statuses, setStatuses] = React.useState(new Array(typedKeys(sourcesRegistry).length).fill(false));
  // const sourcesConfigs = Object.values(sourcesRegistry);
  // async function checkStatus(index: number) {
  //   const updatedStatuses = [];
  //   try {
  //     const response = await axios.get(sourcesConfigs[index].url.status);
  //     if (response.status === 200) {
  //       updatedStatuses.push(true);
  //     }
  //   } catch {
  //     updatedStatuses.push(false);
  //   }
  // }
  // useEffect(() => {
  //   const updatedStatuses = statuses.map((_, index) => checkStatus(index));
  //   setStatuses(updatedStatuses);
  // }, []);
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
                      <StatusIndicator success={true} size={isSmUp ? 1 : 0.9} />
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
