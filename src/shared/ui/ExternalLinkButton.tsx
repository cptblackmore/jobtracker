import { Button, Link, SxProps } from '@mui/material';

interface Props {
  text: string;
  link: string;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps
}

export const ExternalLinkButton: React.FC<Props> = ({ text, link, variant, sx, size='medium' }) => {
  return (
    <Link href={link} target='_blank' rel='noopener' sx={sx} >
      <Button variant={variant} size={size} sx={{width: '100%'}} >{text}</Button>
    </Link>
  );
}
