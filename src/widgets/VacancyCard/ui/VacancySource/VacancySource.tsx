import { superjobIcon, trudvsemIcon, hhIcon } from '@shared/ui';
import { sourceColorStyles, imgStyle, vacancySourceStyle } from './styles';

interface Props {
  source: string;
}

export const VacancySource: React.FC<Props> = ({source}) => {
  switch (source) {
    case 'superjob':
      return (
        <span css={[vacancySourceStyle, sourceColorStyles.superjob]}>SuperJob <img src={superjobIcon} css={imgStyle}></img></span>
      )
    case 'hh':
      return (
        <span css={[vacancySourceStyle, sourceColorStyles.hh]}>HeadHunter <img src={hhIcon} css={imgStyle}></img></span>
      )
    case 'trudvsem':
      return ( 
        <span css={[vacancySourceStyle, sourceColorStyles.trudvsem]}>Работа России <img src={trudvsemIcon} css={imgStyle}></img></span>
      )
    default:
      return (
        <span>{source}</span>
      )
  }
}
