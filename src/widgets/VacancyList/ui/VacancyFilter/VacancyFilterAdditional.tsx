import { servicesRegistry, VacancyParams, VacancyPeriod, VacancyType } from "@entities/Vacancy";
import { Stack, MenuItem, Divider, Slider, TextField, Grid2, FormControlLabel, Checkbox, Box, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Info } from "@mui/icons-material";
import { VacancySource } from "@widgets/VacancyCard/ui/VacancySource/VacancySource";
import { typedEntries } from "@shared/lib";

interface Props {
  filters: VacancyParams['filters'];
}

export const VacancyFilterAdditional: React.FC<Props> = ({ filters }) => {
  const [period, setPeriod] = useState(filters?.period ?? 0);
  const [salary, setSalary] = useState(filters?.salary ?? {from: 0, to: 500_000});
  const [type, setType] = useState(filters?.type ?? 'none');
  const [isSalaryEnabled, setIsSalaryEnabled] = useState(!!((filters?.salary?.from ?? null) || (filters?.salary?.to ?? null)));

  function handleSliderChange(newValue: number[]) {
    setSalary({from: newValue[0], to: newValue[1]})
    setIsSalaryEnabled(true);
  }

  function handleSalaryChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'from' | 'to'
  ) {
    setSalary({ ...salary, [field]: Number(e.target.value) });
    setIsSalaryEnabled(true);
  };

  const [services, setServices] = useState(
    typedEntries(servicesRegistry).map(([source, config]) => (
      {
        source,
        color: config.styles.color,
        incompatibleFilters: config.incompatibleFilters,
        checked: true,
        incompatible: false
      }
    ))
  );

  useEffect(() => {
    const selectedFilters: Array<keyof VacancyParams['filters']> = [];

    if (period !== 0) selectedFilters.push('period');
    if (type !== 'none') selectedFilters.push('type');
    if (isSalaryEnabled) selectedFilters.push('salary');

    setServices(services.map((service) => {
      return {
        ...service,
        incompatible: selectedFilters.some(filter => service.incompatibleFilters?.includes(filter))
      }
    }));
  }, [services, period, type, isSalaryEnabled])
  
  function resetFilters() {
    setPeriod(0);
    setType('none');
    setIsSalaryEnabled(false);
  }

  function handleServiceChange(service) {
    if (service.incompatible) {
      resetFilters();
      setServices(services.map((s) => {
        return {
          ...s,
          checked: s.source === service.source ? true : s.checked
        }
      }))
    } else {
      setServices(services.map((s) => {
        return {
          ...s,
          checked: s.source === service.source ? !s.checked : s.checked
        }
      }))
    }
  }

  return (
    <Box>
      <Grid2 container mt={2} >
        <Grid2 size={3} pr={2} >
          <Stack spacing={2} >
            <TextField
              fullWidth
              label='Период размещения'
              name='period'
              select
              value={period} 
              size='small'
              onChange={(e) => setPeriod(Number(e.target.value) as VacancyPeriod)}
            >
              <MenuItem value={1} >1 день</MenuItem>
              <MenuItem value={3} >3 дня</MenuItem>
              <MenuItem value={7} >7 дней</MenuItem>
              <MenuItem value={0} >Без ограничения</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label='Тип занятости'
              name='type'
              select
              value={type} 
              size='small'
              onChange={(e) => setType(e.target.value as 'none' | VacancyType)}
              sx={{
                '& .MuiSelect-select': {color: type === 'none' ? 'text.secondary' : 'text.primary'}
              }}
            >
              <MenuItem value={'none'} >Не выбрано</MenuItem>
              <MenuItem value={'full'} >Полный день</MenuItem>
              <MenuItem value={'shift'} >Сменный график</MenuItem>
              <MenuItem value={'fifo'} >Вахтовый метод</MenuItem>
            </TextField>
          </Stack>
        </Grid2>

        <Divider flexItem orientation='vertical' sx={{mr: '-1px'}} />
        
        <Grid2 size={9} pl={3} pr={1} >
          <FormControlLabel
            label='Учитывать зарплату (₽)'
            control={
              <Checkbox 
                checked={isSalaryEnabled} 
                onChange={() => setIsSalaryEnabled(!isSalaryEnabled)} 
                name='salary' 
              />
            }
            sx={{mr: 0}}
          />
          <Tooltip 
            title='Сервисы вакансий стараются предоставить максимально соответствующие результаты по указанному диапозону зарплат, однако точность не гарантирована.'
            arrow
          >
            <IconButton >
              <Info sx={{fontSize: '0.9em'}} />
            </IconButton>
          </Tooltip>
          <Box sx={{opacity: isSalaryEnabled ? 1 : 0.5}} >
            <Slider
              value={[salary?.from ?? 0, salary?.to ?? 500_000]}
              onChange={(_, newValue) => handleSliderChange(newValue as number[])}
              valueLabelDisplay='auto'
              min={0}
              max={500_000}
              step={1000}
              marks={[
                { value: 0, label: '0' },
                { value: 250_000, label: '250k' },
                { value: 500_000, label: '500k' },
              ]}
            />
            <Stack direction='row' spacing={2} mt={2} >
              <TextField
                label='Мин. зарплата'
                name='salaryFrom'
                type='number'
                size='small'
                fullWidth
                value={salary?.from}
                onChange={(e) => handleSalaryChange(e, 'from')}
              />
              <TextField
                label='Макс. зарплата'
                name='salaryTo'
                type='number'
                size='small'
                fullWidth
                value={salary?.to}
                onChange={(e) => handleSalaryChange(e, 'to')}
              />
            </Stack>
          </Box>
        </Grid2>
      </Grid2>
      <Divider sx={{my: 2}} />
      <Box display='flex' >
        {services.map(service => (
          <FormControlLabel
            sx={{opacity: service.incompatible ? 0.5 : 1}}
            key={service.source}
            name='source'
            value={service.source}
            control={
              <Checkbox 
                sx={{'& .MuiSvgIcon-root': {color: service.color}}}
                checked={service.checked && !service.incompatible}
                onChange={() => handleServiceChange(service)}
              />
            }
            label={<VacancySource source={service.source} />}
          />
        ))}
      </Box>
    </Box>
  );
};
