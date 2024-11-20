import { Box, Button, Card, CardActions, CardContent, CardHeader, css, Divider, Link, Typography } from '@mui/material'
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState } from 'react';
import { VacancyData } from '@entities/VacancyCard/types';
import { ExpandableText } from '@shared/ExpandableText'
import { ToggleIconButton } from '@shared/ToggleIconButton';

interface Props {
  data: VacancyData;
  isFavorite?: boolean;
}

const VacancyCard: React.FC<Props> = ({ data, isFavorite=false }) => {
  const datePublished = new Date(data.datePublished * 1000);
  const distance = formatDistanceToNow(datePublished, { addSuffix: true, locale: ru });
  const currencyFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: data.currency, maximumFractionDigits: 0 });
  const paymentFrom = currencyFormatter.format(data.paymentFrom || 0);
  const paymentTo = currencyFormatter.format(data.paymentTo || 0);

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
          >
            {distance} на {data.source === 0 ? <span css={css`color: #2eab7f;`}>Superjob.ru</span> : ''}
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

export default VacancyCard