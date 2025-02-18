import { LoadingPage } from '@pages/loading';
import { Navigate, Outlet } from 'react-router';

interface Props {
  isInit: boolean;
  isAllowed: boolean | null;
}

export const ProtectedRoute: React.FC<Props> = ({ isInit, isAllowed }) => {
  if (!isInit) {
    return <LoadingPage />;
  }

  return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};
