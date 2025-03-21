import { Box, Card, CardContent, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Nav } from '@widgets/Nav';
import { containerStyles } from './styles';
import { Contrast, FavoriteBorder, HowToReg, MoreHoriz, Search } from '@mui/icons-material';
import { VacancyListDemo } from '@widgets/VacancyList';

export const HomePage: React.FC = () => {
  return (
    <Box>
      <Nav />
      <Container maxWidth='lg' css={containerStyles} >
        <Box maxWidth='md' paddingTop='1em' >
          <Card sx={{paddingLeft: '1em', paddingRight: '1em'}} >
            <CardContent>
              <Typography variant='h4' align='center' >Добро пожаловать на сайт по поиску работы!</Typography>
              <Divider css={{margin: '1em'}} />
              <Typography variant='h5' align='center' >В скором времени здесь появится много возможностей:</Typography>
              <List css={{paddingBottom: 0}} >
                <ListItem>
                  <ListItemIcon><Search/></ListItemIcon>
                  <ListItemText primary='Поиск вакансий по профессии и фильтрам' />
                </ListItem>
                <ListItem>
                  <ListItemIcon><FavoriteBorder/></ListItemIcon>
                  <ListItemText primary='Добавление в избранное и управление списком избранного' />
                </ListItem>
                <ListItem>
                  <ListItemIcon><HowToReg/></ListItemIcon>
                  <ListItemText primary='Регистрация для сохранения добавленного' />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Contrast/></ListItemIcon>
                  <ListItemText primary='Темизация с определением стандартной темы пользователя' />
                </ListItem>
                <ListItem>
                  <ListItemIcon><MoreHoriz/></ListItemIcon>
                  <ListItemText primary='и многое другое...' />
                </ListItem>
              </List>
              <Divider css={{margin: '1em'}} />
              <Typography variant='h5' align='center' marginBottom={2} >А пока что вы можете просмотреть самые актуальные вакансии:</Typography>
              <VacancyListDemo />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
