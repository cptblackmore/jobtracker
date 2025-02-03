import { Box, Button } from '@mui/material';
import { Logo } from '@widgets/Logo';
import { Link as RouterLink } from 'react-router';

interface Props {
  pages: Record<string, [string, string]>;
  handleCloseNavMenu: () => void;
}

export const HeaderMd: React.FC<Props> = ({ pages, handleCloseNavMenu }) => {
  return (
    <Box sx={{display: { xs: 'none', md: 'flex' }, alignItems: 'center'}} >
      <Logo/>
      <Box sx={{ display: 'flex' }}>
        {Object.values(pages).map((page) => (
          page[0] && (
            <Button
              key={page[0]}
              onClick={handleCloseNavMenu}
              component={RouterLink}
              to={page[1]}
              sx={{ my: 1, color: 'white', display: 'block' }}
            >
              {page[0]}
            </Button>
          )
        ))}
      </Box>
    </Box>
  );
};
