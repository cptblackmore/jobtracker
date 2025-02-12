import { LoadingPage } from '@pages/loading';
import { Outlet } from 'react-router';

interface Props {
  isReady: boolean
}

export const WaitingRoute: React.FC<Props> = ({ isReady }) => {

  return isReady ? <Outlet /> : <LoadingPage />;
};
