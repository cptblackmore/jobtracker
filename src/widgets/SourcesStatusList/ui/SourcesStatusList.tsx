import { sourcesRegistry } from '@entities/Vacancy';
import { FiberManualRecord } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Fragment } from 'react';

export const SourcesStatusList: React.FC = () => {
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
    <List 
      disablePadding 
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`, 
        borderRadius: 2
      }} 
    >
      {Object.values(sourcesRegistry).map((value, index) => {
        return (
          <Fragment key={index} >
            {index !== 0 && <Divider />}
            <ListItem
              sx={{
                cursor: 'pointer',
                transition: 'background 0.2s',
                '&:hover': {bgcolor: (theme)  => theme.palette.action.hover},
              }}
              onClick={() => window.open(value.url.frontendOrigin, '_blank')}
            >
              <ListItemIcon>
                <img src={value.styles.icon} css={{width: '1.1em', height: '1.1em', fontSize: '1.5em'}} />
              </ListItemIcon>
              <ListItemText primary={value.styles.name} secondary={value.url.frontendDomain} />
              <ListItemIcon sx={{minWidth: 0}} >
                <FiberManualRecord color='success' />
              </ListItemIcon>
            </ListItem>
          </Fragment>
        )
      })}
    </List>
  );
}
