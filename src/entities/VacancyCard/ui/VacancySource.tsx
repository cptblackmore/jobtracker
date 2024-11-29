import { css } from '@emotion/react';
import { superjobIcon, trudvsemIcon, hhIcon } from '@shared/ui';

const imgStyle = css`
  width: 1.1em;
  height: 1.1em;
`
const vacancySourceStyle = css`
  display: flex;
  align-items: center;
  gap: 0.3em;
`

const superjobColor = css`color: #00AA87`;
const hhColor = css`color: #D6001C`;
const trudvsemColor = css`color: #004A97`;

interface Props {
  source: string;
}

export const VacancySource: React.FC<Props> = ({ source }) => {

  switch (source) {
    case 'superjob':
      return <
        span css={[vacancySourceStyle, superjobColor]}>SuperJob <img src={superjobIcon} css={imgStyle}></img></span
      >
    case 'hh':
      return <
        span css={[vacancySourceStyle, hhColor]}>HeadHunter <img src={hhIcon} css={imgStyle}></img></span
      >
    case 'trudvsem':
      return <
        span css={[vacancySourceStyle, trudvsemColor]}>Работа России<img src={trudvsemIcon} css={imgStyle}></img></span
      >
    default:
      return <span>{source}</span>;
  }
};