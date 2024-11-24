import { css } from '@emotion/react';
import { superjobIcon } from '@shared/ui'

const imgStyle = css`
  width: 1.1em;
  height: 1.1em;
`
const vacancySourceStyle = css`
  display: flex;
  align-items: center;
  gap: 0.3em;
  color: #00AA87;
`

interface Props {
  source: string;
}

export const VacancySource: React.FC<Props> = ({ source }) => {

  switch (source) {
    case 'superjob':
      return <
        span css={vacancySourceStyle}>SuperJob <img src={superjobIcon} css={imgStyle}></img></span
      >
    default:
      return <span>{source}</span>;
  }
};