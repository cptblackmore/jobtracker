import { Info } from '@mui/icons-material';
import { Checkbox, Fade, FormControl, FormControlLabel, FormGroup, IconButton, Stack, Tooltip } from '@mui/material';
import { VacancySource } from '@widgets/VacancyCard/ui/VacancySource/VacancySource';
import { filterLabelsMap } from '@widgets/VacancyList/model/VacancyFilter/filterLabelsMap';
import { Service } from '@widgets/VacancyList/model/VacancyFilter/useServicesFilter';
import { Fragment } from 'react';

interface Props {
  services: Service[];
  handleServiceChange: (service: Service) => void;
}

export const ServiceSelection: React.FC<Props> = ({ services, handleServiceChange }) => {
  return (
    <FormControl component='fieldset' fullWidth >
      <FormGroup sx={{flexDirection: 'row', gap: 1}} >
        {services.map(service => (
          <Fragment key={service.source} >

            {(!service.checked || service.incompatible) && (
              <input type='hidden' name='excludedSource' value={service.source} />
            )}

            <FormControlLabel
              sx={{
                opacity: service.incompatible ? 0.5 : 1,
                border: `1px solid ${service.color}`,
                borderRadius: 1,
                backgroundColor: `${service.checked && !service.incompatible ? service.color + '10' : 'transparent'}`,
                m: 0
              }}
              control={
                <Checkbox 
                  name='source'
                  size='small'
                  value={service.source}
                  sx={{'& .MuiSvgIcon-root': {color: service.color}}}
                  checked={service.checked && !service.incompatible}
                  onChange={() => handleServiceChange(service)}
                />
              }
              label={
                <Stack sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 0, pr: 1.5}}>
                  <VacancySource source={service.source} />
                  {service.incompatibleFilters && (
                    <Tooltip 
                      arrow
                      TransitionComponent={Fade}
                      title={
                        'Данный сервис несовместим со следующими фильтрами: ' 
                          + 
                        service.incompatibleFilters.map(filter => filterLabelsMap[filter]).join(', ')
                      }
                    >
                      <IconButton sx={{p: 0, ml: 1}} >
                        <Info sx={{fontSize: '0.8em'}} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              }
            />
          </Fragment>
        ))}
      </FormGroup>
    </FormControl>
  );
};
