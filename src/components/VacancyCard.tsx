import { Box, Button, Card, CardActions, CardContent, CardHeader, css, Divider, Link, Typography } from '@mui/material'
import VacancyData from '../interfaces/VacancyData'
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import FavoriteButton from './FavoriteButton';
import { useState } from 'react';

interface Props {
  data: VacancyData;
  isFavorite?: boolean;
}

const VacancyCard: React.FC<Props> = ({ data, isFavorite=false }) => {
  const currencyChar = data.currency === 'rub' ? 'руб.' : 'руб.';
  const datePublished = new Date(data.datePublished * 1000);
  const distance = formatDistanceToNow(datePublished, { addSuffix: true, locale: ru });

  const [isFavoriteState, setIsFavoriteState] = useState<boolean>(isFavorite); // TODO Delete this

  return (
    <Card
      css={css`
        width: 60%;
        align-self: center;
        display: flex;
      `}
    >
      <CardActions
        css={css`
          align-items: start;
          padding-top: 1em;
        `}
      >
        <FavoriteButton 
          isFavorite={isFavoriteState} 
          setIsFavorite={() => setIsFavoriteState(!isFavoriteState)} /* TODO Make normal set state */
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
            <Typography 
              paddingLeft={1} 
              textAlign='start'
              display='flex'
            >
              {data.firmName}
              <Divider 
                css={css`
                  margin-left: 1em;
                  margin-right: 1em;
                `}
                orientation='vertical' 
                flexItem 
              />
              {data.town}
            </Typography>
          }
        />
        <CardContent
          css={css`
            padding-bottom: 0.5em;
          `}
        >
          <Typography
            textAlign='start'
            paddingLeft={1}
          >
            {data.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography 
            paddingLeft={2}
          >
            {distance} на {data.source === 0 ? <Typography component='span' color='blue' >Superjob.ru</Typography> : ''}
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
        <CardHeader
          title={
            <Typography>
              {!data.paymentFrom && !data.paymentTo && 'Зарплата не указана'}
              {data.paymentFrom ? <Typography whiteSpace='nowrap'>от <Typography component='span' fontWeight={700} >{data.paymentFrom} {currencyChar}</Typography></Typography> : ''}
              {data.paymentTo ? <Typography whiteSpace='nowrap'>до <Typography component='span' fontWeight={700} >{data.paymentTo} {currencyChar}</Typography></Typography> : ''}
            </Typography>
          }
        />
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

export default VacancyCard
