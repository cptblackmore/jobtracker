import { Box, Typography as T } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Logo: React.FC<Props> = ({ titleSize='h6' }) => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}} >
      <WorkIcon sx={{ display: 'flex', mr: 1 }} />
      <T
        variant={titleSize}
        noWrap
        component="a"
        href="home"
        sx={{
          mr: 1,
          display: 'flex',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          paddingBottom: '0.2em'
        }}
      >
        jobtracker
      </T>
    </Box>
  );
};
