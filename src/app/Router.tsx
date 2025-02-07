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
        <Route path='/' element={<Navigate to={pages.home.path} />} />
        <Route path='*' element={<Navigate to={pages.home.path} />} />
        <Route path={pages.home.path} element={<HomePage />} />
        <Route path={pages.feed.path} element={<FeedPage />} />
        <Route path={pages.favorites.path} element={<FavoritesPage />} />
        <Route path={pages.activation.path} element={<ActivationPage />} />
        <Route element={<ProtectedRoute />} >
          <Route path={pages.account.path} element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
