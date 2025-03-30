import { Info } from '@mui/icons-material';
import { Checkbox, Fade, FormControl, FormControlLabel, FormGroup, IconButton, Stack, Tooltip } from '@mui/material';
import { VacancySource } from '@widgets/VacancySource/ui/VacancySource';
import { Fragment } from 'react';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { SourceFilter } from '../model/useSourcesFilter';

interface Props {
  sources: SourceFilter[];
  handleSourceChange: (source: SourceFilter) => void;
}

export const SourceSelection: React.FC<Props> = ({ sources, handleSourceChange }) => {
  return (
    <FormControl component='fieldset' fullWidth >
      <FormGroup sx={{flexDirection: 'row', gap: 1}} >
        {sources.map(source => (
          <Fragment key={source.source} >

            {(!source.checked || source.incompatible) && (
              <input type='hidden' name='excludedSource' value={source.source} />
            )}

            <FormControlLabel
              sx={{
                opacity: source.incompatible ? 0.5 : 1,
                border: `1px solid ${source.color}`,
                borderRadius: 1,
                backgroundColor: `${source.checked && !source.incompatible ? source.color + '10' : 'transparent'}`,
                transition: 'background-color 0.2s',
                m: 0
              }}
              control={
                <Checkbox 
                  name='source'
                  size='small'
                  value={source.source}
                  sx={{'& .MuiSvgIcon-root': {color: source.color}}}
                  checked={source.checked && !source.incompatible}
                  onChange={() => handleSourceChange(source)}
                />
              }
              label={
                <Stack sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 0, pr: 1.5}}>
                  <VacancySource source={source.source} />
                  {source.incompatibleFilters && (
                    <Tooltip 
                      arrow
                      TransitionComponent={Fade}
                      title={
                        'Данный сервис несовместим со следующими фильтрами: ' 
                          + 
                        source.incompatibleFilters.map(filter => filterLabelsMap[filter]).join(', ')
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
