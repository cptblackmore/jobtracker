import { Box, Container, Grid2, Slide, SxProps, useMediaQuery, useTheme } from '@mui/material';
import { FeatureIconFilter } from '../icons/FeatureIconFilter';
import { FeatureItem } from './FeatureItem';
import { SectionTitle } from './SectionTitle';
import { FeatureIconFavorite } from '../icons/FeatureIconFavorite';
import { FeatureIconFast } from '../icons/FeatureIconFast';
import { FeatureIconDownload } from '../icons/FeatureIconDownload';
import { FeatureIconEndless } from '../icons/FeatureIconEndless';
import { FeatureIconExport } from '../icons/FeatureIconExport';
import { useInView } from 'react-intersection-observer';

interface Props {
  sectionStyle: SxProps
}

export const FeaturesSection: React.FC<Props> = ({ sectionStyle }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4
  });
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const iconColor = theme.palette.primary.contrastText;
  const iconSize = isSmUp ? '3.5em' : '3em';
  const gridSize = {xs: 12, md: 6};

  return (
    <Box 
      component='section'
      ref={ref}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light, 
        color: (theme) => theme.palette.primary.contrastText,
        overflow: 'hidden',
        position: 'relative',
        ...sectionStyle
      }}
    >
      <Container maxWidth='md' >
        <SectionTitle title='Отличительные преимущества' />
        <Grid2 container spacing={{xs: 2, sm: 3}}>
          <Slide in={inView} direction='right' timeout={600} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconFast color={iconColor} size={iconSize} />} 
                text='Быстрый и отказоустойчивый поиск' 
              />
            </Grid2>
          </Slide>
          <Slide in={inView} direction='left' timeout={600} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconFavorite color={iconColor} size={iconSize} />} 
                text='Избранное хранится не только у вас, но и на сервере' 
              />
            </Grid2>
          </Slide>
          <Slide in={inView} direction='right' timeout={650} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconFilter color={iconColor} size={iconSize} />} 
                text='Гибкая фильтрация, учитывающая особенности каждого источника' 
              />
            </Grid2>
          </Slide>
          <Slide in={inView} direction='left' timeout={650} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconDownload color={iconColor} size={iconSize} />} 
                text='Скачивание избранного в форматах TXT и CSV' 
              />
            </Grid2>
          </Slide>
          <Slide in={inView} direction='right' timeout={700} >
            <Grid2 size={gridSize} >
              <FeatureItem 
                icon={<FeatureIconEndless color={iconColor} size={iconSize} />} 
                text='Бесконечная лента вакансий, не нагружающая ваш браузер' 
              />
            </Grid2>
          </Slide>
          <Slide in={inView} direction='left' timeout={700} >
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
