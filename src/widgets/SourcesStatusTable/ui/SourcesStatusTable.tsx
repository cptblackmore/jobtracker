import { sourcesRegistry } from '@entities/Vacancy';
import { Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Zoom } from '@mui/material';
import { typedEntries } from '@shared/lib';
import { StatusIndicator } from '@shared/ui';
import { VacancySource } from '@widgets/VacancySource';

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

  return (
    <TableContainer>
      <Table>
        <TableBody sx={{'& > :last-child td, & > :last-child th': {borderBottom: 0}}} >
          {typedEntries(sourcesRegistry).map(([source, config], index) => {
            return (
              <Tooltip
                key={index} 
                title={`Перейти на ${config.url.frontendDomain}`}
                followCursor
                TransitionComponent={Zoom}
                PopperProps={{
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 20]
                      }
                    }
                  ]
                }}
              >
                <TableRow 
                  component='a'
                  href={config.url.frontendOrigin}
                  rel='noopener noreferrer'
                  target='_blank'
                  tabIndex={-1}
                  hover 
                  sx={{
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <TableCell component='th' scope='row' width='100%' >
                    <VacancySource source={source} reverse size={1.3} gap={3} />
                  </TableCell>
                  <TableCell>
                    <StatusIndicator success={true} />
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
