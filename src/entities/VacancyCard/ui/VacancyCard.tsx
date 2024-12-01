import { Box, Button, Card, CardActions, CardContent, CardHeader, css, Divider, Link, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState } from 'react';
import { VacancySource, VacancyPayment } from '@entities/VacancyCard';
import { Vacancy } from '@shared/api';
import { ExpandableText, ToggleIconButton } from '@shared/ui';
import { formatNumberByCurrency } from '@shared/lib/formatNumberByCurrency';

interface Props {
  data: Vacancy;
  isFavorite?: boolean;
}

export const VacancyCard: React.FC<Props> = ({ data, isFavorite=false }) => { // TODO Decompose this component
  const datePublished = new Date(data.datePublished);
  const distance = formatDistanceToNow(datePublished, { addSuffix: true, locale: ru });
  const paymentFrom = data.paymentFrom ? formatNumberByCurrency(data.paymentFrom, data.currency) : null;
  const paymentTo = data.paymentTo ? formatNumberByCurrency(data.paymentTo, data.currency) : null;

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
          <VacancyPayment paymentFrom={paymentFrom} paymentTo={paymentTo} />
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
