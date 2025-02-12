import { LoadingPage } from '@pages/loading';
import { Navigate, Outlet } from 'react-router';

interface Props {
  isAllowed: boolean | null;
}

export const ProtectedRoute: React.FC<Props> = ({ isAllowed }) => {
  if (isAllowed === null) {
    return <LoadingPage />;
  }

  return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};
