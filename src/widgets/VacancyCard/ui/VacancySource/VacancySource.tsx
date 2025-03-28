import { sourcesRegistry, Sources } from '@entities/Vacancy';

interface Props {
  source: Sources
}

export const VacancySource: React.FC<Props> = ({source}) => {
  const styles = sourcesRegistry[source].styles

  return (
    <span 
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.3em',
        color: styles.color
      }}
    >
      {styles.name} <img src={styles.icon} css={{width: '1.1em', height: '1.1em'}} />
    </span>
  )
}
