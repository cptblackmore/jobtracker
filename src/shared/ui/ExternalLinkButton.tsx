import { Button, SxProps } from '@mui/material';

interface Props {
  text: string;
  link: string;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps
}

export const ExternalLinkButton: React.FC<Props> = ({ text, link, variant, sx, size='medium' }) => {
  return (
    <Button 
      variant={variant} 
      size={size} 
      sx={{width: '100%', ...sx}} 
      component='a'
      target='_blank'
      rel='noopener'
      href={link}
    >
      {text}
    </Button>
  );
}
