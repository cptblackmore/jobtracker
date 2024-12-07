import { Box, Button } from "@mui/material";
import { Logo } from "@widgets/Logo";

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
          <Button
            key={page[0]}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
            href={page[1]}
          >
            {page[0]}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
