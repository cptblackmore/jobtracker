import { Box } from '@mui/material';
import { PagesContext } from '@shared/config';
import { Footer } from '@widgets/Footer';
import { Nav } from '@widgets/Nav';
import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

export const PageLayout: React.FC = () => {
  const location = useLocation();
  const { currentPage, updateCurrentPage } = useContext(PagesContext)
  
  useEffect(() => {
    updateCurrentPage(window.location.pathname);
  }, [location.pathname]);

  return (
    <Box
      display='flex' 
      flexDirection='column' 
      minHeight='100vh'
    >
      <Nav />
        <Outlet />
      {!currentPage?.withoutFooter && (
        <Footer />
      )}
    </Box>
  );
}
