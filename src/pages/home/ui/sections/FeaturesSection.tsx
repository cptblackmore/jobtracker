import { Box, Container, Grid2, Slide, SxProps, useMediaQuery, useTheme } from '@mui/material';
import { FeatureIconFilter } from '../icons/FeatureIconFilter';
import { FeatureItem } from './FeatureItem';
import { SectionTitle } from './SectionTitle';
import { FeatureIconFavorite } from '../icons/FeatureIconFavorite';
import { FeatureIconFast } from '../icons/FeatureIconFast';
import { FeatureIconDownload } from '../icons/FeatureIconDownload';
import { FeatureIconEndless } from '../icons/FeatureIconEndless';
import { FeatureIconExport } from '../icons/FeatureIconExport';

interface Props {
  sectionStyle: SxProps
}

export const FeaturesSection: React.FC<Props> = ({ sectionStyle }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const iconColor = theme.palette.primary.contrastText;
  const iconSize = isSm ? '3em' : '3.5em';
  const gridSize = {xs: 12, md: 6};

  return (
    <Box 
      component='section'
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light, 
        color: (theme) => theme.palette.primary.contrastText,
        ...sectionStyle
      }}
    >
      <Container maxWidth='md' >
        <SectionTitle title='Отличительные преимущества' />
        <Grid2 container spacing={{xs: 2, sm: 3}}>
          <Slide in direction='right' timeout={600} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconFast color={iconColor} size={iconSize} />} 
                text='Быстрый и отказоустойчивый поиск' 
              />
            </Grid2>
          </Slide>
          <Slide in direction='left' timeout={600} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconFavorite color={iconColor} size={iconSize} />} 
                text='Избранное хранится не только у вас, но и на сервере' 
              />
            </Grid2>
          </Slide>
          <Slide in direction='right' timeout={650} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconFilter color={iconColor} size={iconSize} />} 
                text='Гибкая фильтрация, учитывающая особенности каждого источника' 
              />
            </Grid2>
          </Slide>
          <Slide in direction='left' timeout={650} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconDownload color={iconColor} size={iconSize} />} 
                text='Скачивание избранного в форматах TXT и CSV' 
              />
            </Grid2>
          </Slide>
          <Slide in direction='right' timeout={700} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconEndless color={iconColor} size={iconSize} />} 
                text='Бесконечная лента вакансий, не нагружающая ваш браузер' 
              />
            </Grid2>
          </Slide>
          <Slide in direction='left' timeout={700} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconExport color={iconColor} size={iconSize} />} 
                text='Экспорт &amp; Импорт избранного' 
              />
            </Grid2>
          </Slide>
        </Grid2>
      </Container>
    </Box>
  );
}
