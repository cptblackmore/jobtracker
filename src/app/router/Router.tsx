import { FavoritesPage } from '@pages/favorites';
import { SearchPage } from '@pages/search';
import { HomePage } from '@pages/home';
import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { PagesContext } from '@shared/lib';
import { ActivationPage } from '@pages/activation';
import { AccountPage } from '@pages/account';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';

export const Router: React.FC = observer(() => {
  const pages = useContext(PagesContext);
  const { authStore } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={pages.home.path} />} />
        <Route path='*' element={<Navigate to={pages.home.path} />} />
        <Route path={pages.home.path} element={<HomePage />} />
        <Route path={pages.search.path} element={<SearchPage />} />
        <Route element={<ProtectedRoute isReady={authStore.isInit} isAllowed={true} />} >
          <Route path={pages.favorites.path} element={<FavoritesPage />} />
        </Route>
        <Route element={<ProtectedRoute isReady={authStore.isInit} isAllowed={true} />} >
          <Route path={pages.activation.path} element={<ActivationPage />} />
        </Route>
        <Route element={<ProtectedRoute isReady={authStore.isInit} isAllowed={authStore.isAuth} />} >
          <Route path={pages.account.path} element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
