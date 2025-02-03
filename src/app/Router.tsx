import { FavoritesPage } from '@pages/favorites';
import { FeedPage } from '@pages/feed';
import { HomePage } from '@pages/home';
import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { PagesContext } from '@shared/lib';

export const Router: React.FC = () => {
  const pages = useContext(PagesContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={pages.home[1]} />} />
        <Route path='*' element={<Navigate to={pages.home[1]} />} />
        <Route path={pages.home[1]} element={<HomePage />} />
        <Route path={pages.feed[1]} element={<FeedPage />} />
        <Route path={pages.favorites[1]} element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
};
