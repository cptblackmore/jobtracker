import { LoadingPage } from '@pages/loading';
import { Navigate, Outlet } from 'react-router';

interface Props {
  isReady: boolean;
  isAllowed: boolean | null;
}

export const ProtectedRoute: React.FC<Props> = ({ isReady, isAllowed }) => {
  if (!isReady) {
    return <LoadingPage />;
  }

  return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};
