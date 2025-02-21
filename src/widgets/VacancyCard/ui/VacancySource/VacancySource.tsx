import { servicesRegistry, Sources } from '@entities/Vacancy';
import { imgStyle, vacancySourceStyle } from './styles';

interface Props {
  source: Sources
}

export const VacancySource: React.FC<Props> = ({source}) => {
  const styles = servicesRegistry[source].styles
  return (
    <span css={[vacancySourceStyle, {color: styles.color}]} >{styles.name} <img src={styles.icon} css={imgStyle} /></span>
  )
}
