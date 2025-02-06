import { FavoritesPage } from '@pages/favorites';
import { FeedPage } from '@pages/feed';
import { HomePage } from '@pages/home';
import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { PagesContext } from '@shared/lib';
import { ActivationPage } from '@pages/activation';
import { AccountPage } from '@pages/account';
import { ProtectedRoute } from './ProtectedRoute';

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
        <Route path={pages.activation[1]} element={<ActivationPage />} />
        <Route element={<ProtectedRoute />} >
          <Route path={pages.account[1]} element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
