import { sourcesRegistry, Sources } from '@entities/Vacancy';

interface Props {
  source: Sources;
  reverse?: boolean;
  size?: number;
  gap?: number
}

export const VacancySource: React.FC<Props> = ({ source, reverse, size=1, gap=1 }) => {
  const styles = sourcesRegistry[source].styles

  return (
    <span 
      css={{
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        justifyContent: reverse ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        gap: `${gap * 0.3}em`,
        color: styles.color,
        fontSize: `${size}em`,
      }}
    >
      {styles.name}
      <img src={styles.icon} css={{width: '1.1em', height: '1.1em'}} />
    </span>
  )
}
