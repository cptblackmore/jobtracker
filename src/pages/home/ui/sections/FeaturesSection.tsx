import { Box, Container, Grid2, Slide, useTheme } from '@mui/material';
import { FeatureIconFilter } from '../icons/FeatureIconFilter';
import { FeatureItem } from './FeatureItem';
import { SectionTitle } from './SectionTitle';
import { FeatureIconFavorite } from '../icons/FeatureIconFavorite';
import { FeatureIconFast } from '../icons/FeatureIconFast';
import { FeatureIconDownload } from '../icons/FeatureIconDownload';
import { FeatureIconEndless } from '../icons/FeatureIconEndless';
import { FeatureIconExport } from '../icons/FeatureIconExport';

export const FeaturesSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box 
      component='section'  
      sx={{
        backgroundColor: (theme) => theme.palette.primary.dark, 
        color: (theme) => theme.palette.primary.contrastText
      }}
    >
      <Container maxWidth='md' >
        <Box py={8} >
          <SectionTitle title='Отличительные преимущества' />
          <Grid2 container spacing={3}>
            <Slide in direction='right' timeout={600} >
              <Grid2 size={6} >
                <FeatureItem 
                  icon={<FeatureIconFast color={theme.palette.primary.contrastText} size='3.5em' />} 
                  text='Быстрый и отказоустойчивый поиск' 
                />
              </Grid2>
            </Slide>
            <Slide in direction='left' timeout={600} >
              <Grid2 size={6} >
                <FeatureItem 
                  icon={<FeatureIconFavorite color={theme.palette.primary.contrastText} size='3.5em' />} 
                  text='Избранное хранится не только у вас, но и на сервере' 
                />
              </Grid2>
            </Slide>
            <Slide in direction='right' timeout={650} >
              <Grid2 size={6} >
                <FeatureItem 
                  icon={<FeatureIconFilter color={theme.palette.primary.contrastText} size='3.5em' />} 
                  text='Гибкая фильтрация, учитывающая особенности каждого источника' 
                />
              </Grid2>
            </Slide>
            <Slide in direction='left' timeout={650} >
              <Grid2 size={6} >
                <FeatureItem 
                  icon={<FeatureIconDownload color={theme.palette.primary.contrastText} size='3.5em' />} 
                  text='Скачивание избранного в форматах TXT и CSV' 
                />
              </Grid2>
            </Slide>
            <Slide in direction='right' timeout={700} >
              <Grid2 size={6} >
                <FeatureItem 
                  icon={<FeatureIconEndless color={theme.palette.primary.contrastText} size='3.5em' />} 
                  text='Бесконечная лента вакансий, не нагружающая ваш браузер' 
                />
              </Grid2>
            </Slide>
            <Slide in direction='left' timeout={700} >
              <Grid2 size={6} >
                <FeatureItem 
                  icon={<FeatureIconExport color={theme.palette.primary.contrastText} size='3.5em' />} 
                  text='Экспорт &amp; Импорт избранного' 
                />
              </Grid2>
            </Slide>
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
}
