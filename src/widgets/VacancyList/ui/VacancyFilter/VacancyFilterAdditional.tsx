import { servicesRegistry, Sources, VacancyParams, VacancyPeriod, VacancyType } from "@entities/Vacancy";
import { Stack, MenuItem, Divider, Slider, TextField, Grid2, FormControlLabel, Checkbox, Box, IconButton, Tooltip, Select, FormControl, InputLabel, FormGroup, SelectChangeEvent, Button, Fade } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Info } from "@mui/icons-material";
import { VacancySource } from "@widgets/VacancyCard/ui/VacancySource/VacancySource";
import { typedEntries } from "@shared/lib";

interface Service {
  source: Sources;
  color: string;
  incompatibleFilters?: Array<keyof VacancyParams['filters']>;
  checked: boolean;
  incompatible: boolean
}

type SwitchableVacancyType = VacancyType | 'none';

interface Props {
  filters: VacancyParams['filters'];
}

export const VacancyFilterAdditional: React.FC<Props> = ({ filters }) => {
  const SALARY_MIN = 0;
  const SALARY_MAX = 500_000;
  const [period, setPeriod] = useState(filters?.period ?? 0);
  const [type, setType] = useState<SwitchableVacancyType>(filters?.type ?? 'none');
  const [salaryFilter, setSalaryFilter] = useState<{enabled: boolean, from: number, to: number}>({
    enabled: !!((filters?.salary?.from ?? null) || (filters?.salary?.to ?? null)), 
    from: filters?.salary?.from ?? SALARY_MIN, 
    to: filters?.salary?.to ?? SALARY_MAX
  });
  const [enabledServices, setEnabledServices] = useState(filters?.sources ?? [])
  const filtersMap: Record<string, string> = {
    text: 'Поиск вакансий',
    period: 'Период размещения',
    type: 'Тип занятости',
    salary: 'Заработная плата',
    sources: 'Источники вакансий',
    enableSalary: 'Учитывать зарплату',
    salaryFrom: 'Мин. зарплата',
    salaryTo: 'Макс. зарплата'
  }

  function calculateSelectedFilters(period: VacancyPeriod, type: SwitchableVacancyType, isSalaryEnabled: boolean) {
    const selectedFilters: Array<keyof VacancyParams['filters']> = [];
    if (period !== 0) selectedFilters.push('period');
    if (type !== 'none') selectedFilters.push('type');
    if (isSalaryEnabled) selectedFilters.push('salary');

    return selectedFilters;
  }

  const selectedFilters = useMemo(() => calculateSelectedFilters(period, type, salaryFilter.enabled), [period, type, salaryFilter.enabled]);

  const services: Service[] = useMemo(() => {
    return typedEntries(servicesRegistry).map(([source, config]) => (
      {
        source,
        color: config.styles.color,
        incompatibleFilters: config.incompatibleFilters,
        checked: enabledServices.includes(source),
        incompatible: selectedFilters.some(filter =>
          config.incompatibleFilters?.includes(filter)
        )
      }
    ))
  }, [enabledServices, selectedFilters]);

  const resetFilters = useCallback(() => {
    setPeriod(0);
    setType('none');
    setSalaryFilter(prev => ({...prev, enabled: false}));
  }, []);

  const resetAll = useCallback(() => {
    resetFilters();
    setEnabledServices(
      typedEntries(servicesRegistry).map(([source]) => source)
    );
  }, [resetFilters]);

  const handleServiceChange = useCallback((service: Service) => {
    if (service.incompatible) {
      resetFilters();
      setEnabledServices(prev => [...prev, service.source]);
    } else {
      setEnabledServices(prev => {
        if (prev.includes(service.source)) {
          return prev.filter(s => s !== service.source);
        } else {
          return [...prev, service.source];
        }
      })
    }
  }, [resetFilters]);

  const handleSliderChange = useCallback((newValue: number[]) => {
    setSalaryFilter({enabled: true, from: newValue[0], to: newValue[1]});
  }, []);

  const handleSalaryChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'from' | 'to'
  ) => {
    setSalaryFilter(prev => ({...prev, enabled: true, [field]: Number(e.target.value)}));
  }, []);

  const handlePeriodChange = useCallback((e: SelectChangeEvent<VacancyPeriod>) => {
    setPeriod(Number(e.target.value) as VacancyPeriod);
  }, [])

  const handleTypeChange = useCallback((e: SelectChangeEvent<SwitchableVacancyType>) => {
    setType(e.target.value as SwitchableVacancyType);
  }, [])

  return (
    <Box>
      <Grid2 container mt={2} >
        <Grid2 size={3} pr={2} >
          <Stack spacing={2} >
            <FormControl>
              <InputLabel htmlFor='period' >{filtersMap.period}</InputLabel>
              <Select
                fullWidth
                label={filtersMap.period}
                inputProps={{id: 'period'}}
                name='period'
                value={period} 
                size='small'
                onChange={(e) => handlePeriodChange(e)}
              >
                <MenuItem value={1} >1 день</MenuItem>
                <MenuItem value={3} >3 дня</MenuItem>
                <MenuItem value={7} >7 дней</MenuItem>
                <MenuItem value={0} >Без ограничения</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='type'>{filtersMap.type}</InputLabel>
              <Select
                fullWidth
                label={filtersMap.type}
                name='type'
                inputProps={{id: 'type'}}
                value={type} 
                size='small'
                onChange={(e) => handleTypeChange(e)}
                sx={{
                  '& .MuiSelect-select': {color: type === 'none' ? 'text.secondary' : 'text.primary'}
                }}
              >
                <MenuItem value={'none'} >Не выбрано</MenuItem>
                <MenuItem value={'full'} >Полный день</MenuItem>
                <MenuItem value={'shift'} >Сменный график</MenuItem>
                <MenuItem value={'fifo'} >Вахтовый метод</MenuItem>
              </Select>
            </FormControl>
            <Button color='warning' onClick={resetAll} >Сбросить фильтры</Button>
          </Stack>
        </Grid2>

        <Divider flexItem orientation='vertical' sx={{mr: '-1px'}} />
        
        <Grid2 size={9} pl={3} pr={1} >
          <FormControlLabel
            label={filtersMap.enableSalary + ' (₽)'}
            control={
              <Checkbox 
                checked={salaryFilter.enabled} 
                onChange={() => setSalaryFilter(prev => ({...prev, enabled: !prev.enabled}))} 
                name='salary' 
              />
            }
            sx={{mr: 0}}
          />
          <Tooltip 
            title='Сервисы вакансий стараются предоставить максимально соответствующие результаты по указанному диапозону зарплат, однако точность не гарантирована.'
            TransitionComponent={Fade}
            arrow
          >
            <IconButton >
              <Info sx={{fontSize: '0.8em'}} />
            </IconButton>
          </Tooltip>
          <Box sx={{opacity: salaryFilter.enabled ? 1 : 0.5}} >
            <Slider
              value={[salaryFilter?.from ?? SALARY_MIN, salaryFilter?.to ?? SALARY_MAX]}
              onChange={(_, newValue) => handleSliderChange(newValue as number[])}
              valueLabelDisplay='auto'
              min={SALARY_MIN}
              max={SALARY_MAX}
              step={1000}
              marks={[
                { value: SALARY_MIN, label: `${SALARY_MIN / 1000}k` },
                { value: Math.floor((SALARY_MAX - SALARY_MIN) / 2), label: `${Math.floor((SALARY_MAX - SALARY_MIN) / 2 / 1000)}k` },
                { value: SALARY_MAX, label: `${SALARY_MAX / 1000}k` },
              ]}
            />
            <Stack direction='row' spacing={2} mt={2} >
              <TextField
                label={filtersMap.salaryFrom}
                name='salaryFrom'
                type='number'
                size='small'
                fullWidth
                value={salaryFilter?.from}
                onChange={(e) => handleSalaryChange(e, 'from')}
              />
              <TextField
                label={filtersMap.salaryTo}
                name='salaryTo'
                type='number'
                size='small'
                fullWidth
                value={salaryFilter?.to}
                onChange={(e) => handleSalaryChange(e, 'to')}
              />
            </Stack>
          </Box>
        </Grid2>
      </Grid2>
      <Divider sx={{my: 2}} />
      <FormControl component='fieldset' fullWidth >
        <FormGroup sx={{flexDirection: 'row', gap: 1}} >
          {services.map(service => (
            <FormControlLabel
              sx={{
                opacity: service.incompatible ? 0.5 : 1,
                border: `1px solid ${service.color}`,
                borderRadius: 1,
                backgroundColor: `${service.checked && !service.incompatible ? service.color + '10' : 'transparent'}`,
                m: 0
              }}
              key={service.source}
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
                        service.incompatibleFilters.map(filter => filtersMap[filter]).join(', ')
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
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};
