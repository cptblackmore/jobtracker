import { Button, Link, SxProps } from '@mui/material';

interface Props {
  text: string;
  link: string;
  variant?: 'text' | 'contained' | 'outlined';
  sx?: SxProps
}

export const ExternalLinkButton: React.FC<Props> = ({ text, link, variant, sx }) => {
  return (
    <Link href={link} target='_blank' rel='noopener' sx={sx} >
      <Button variant={variant} >{text}</Button>
    </Link>
  );
}
