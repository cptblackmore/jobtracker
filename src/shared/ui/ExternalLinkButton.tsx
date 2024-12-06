import { Button, Link } from '@mui/material';

interface Props {
  text: string;
  link: string;
}

export const ExternalLinkButton: React.FC<Props> = ({ text, link }) => {
  return (
    <Link href={link} target='_blank' rel='noopener' >
      <Button variant='contained' >{text}</Button>
    </Link>
  );
}
