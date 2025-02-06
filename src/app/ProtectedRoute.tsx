import { LoadingPage } from '@pages/loading';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = observer(() => {
  const { authStore } = useContext(AuthContext);

  if (authStore.isAuth === null) {
    return <LoadingPage />;
  }

  return authStore.isAuth ? <Outlet /> : <Navigate to="/" replace />;
});
