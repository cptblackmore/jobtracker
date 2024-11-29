import { Box, Button, Card, CardActions, CardContent, CardHeader, css, Divider, Link, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState } from 'react';
import { Vacancy } from '@entities/VacancyCard';
import { ExpandableText, ToggleIconButton } from '@shared/ui';
import { VacancySource } from './VacancySource';

interface Props {
  data: Vacancy;
  isFavorite?: boolean;
}

export const VacancyCard: React.FC<Props> = ({ data, isFavorite=false }) => { // TODO Decompose this component
  const datePublished = new Date(data.datePublished);
  const distance = formatDistanceToNow(datePublished, { addSuffix: true, locale: ru });
  const currencyFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: data.currency === 'RUR' ? 'RUB' : data.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }); // TODO Make formatter function for different currencies
  const paymentFrom = currencyFormatter.format(data.paymentFrom || 0);
  const paymentTo = currencyFormatter.format(data.paymentTo || 0);

  const [isFavoriteState, setIsFavoriteState] = useState<boolean>(isFavorite); // TODO Delete this and create common state outside

  return (
    <Card
      css={css`
        align-self: center;
        display: flex;
        width: 100%;
      `}
    >
      <CardActions
        css={css`
        align-items: start;
          padding-top: 1em;
        `}
      >
        <ToggleIconButton
          isToggled={isFavoriteState}

          onToggle={() => setIsFavoriteState(!isFavoriteState)}
          defaultIcon={<FavoriteBorder />}
          toggledIcon={<Favorite color='primary' />}
          defaultTooltip='Добавить в избранное'
          toggledTooltip='Удалить из избранного'
        />
      </CardActions>
      <Divider
        orientation='vertical'
        flexItem
        variant='middle'
      />
      <Box>        
        <CardHeader
          css={css`
            padding-bottom: 0px;
          `}
          title={
            <Typography 
              variant='h5'
              textAlign='start'
              paddingLeft={1}
            >
              {data.profession}
            </Typography>
          }
          subheader={
            <Box
              paddingLeft={1} 
              textAlign='start'
              display='flex'
            >
              <Typography>
                {data.firmName}
              </Typography>
              <Divider 
                css={css`
                  margin-left: 1em;
                  margin-right: 1em;
                  `}
                orientation='vertical' 
                flexItem 
              />
              <Typography>
                {data.town}
              </Typography>
            </Box>
          }
        />
        <CardContent
          css={css`
            padding-bottom: 0.5em;
          `}
        >
          <ExpandableText
            text={data.description}
            maxLength={140}
          />
        </CardContent>
        <CardActions>
          <Typography 
            paddingLeft={2}
            display='flex'
            gap='0.3em'
          >
            {distance} на <VacancySource source={data.source} />
          </Typography>
        </CardActions>
      </Box>
      <Divider 
        orientation='vertical' 
        flexItem 
        variant='middle' 
      />
      <Box  
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <CardContent>
          {!data.paymentFrom && !data.paymentTo && 'Зарплата не указана'}
          {data.paymentFrom ? <Typography whiteSpace='nowrap' textAlign='end'>от <b>{paymentFrom}</b></Typography> : ''}
          {data.paymentTo ? <Typography whiteSpace='nowrap' textAlign='end'>до <b>{paymentTo}</b></Typography> : ''}
        </CardContent>
        <CardActions 
          css={css`
            justify-content: center;  
          `}
        >
          <Link
            href={data.link}
            target='_blank'
            rel='noopener'
          >
            <Button
              variant='contained'
            >
              Подробнее
            </Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  )
}
