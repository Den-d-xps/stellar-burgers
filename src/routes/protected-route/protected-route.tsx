import { userSelectors } from '@selectors';
import { useSelector } from '@store';
import { Preloader } from '@ui';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type TProtectedRoute = {
  isPublic: boolean;
};

export const ProtectedRoute = ({ isPublic }: TProtectedRoute) => {
  const user = useSelector(userSelectors.selectUser);
  const checkUser = useSelector(userSelectors.selectUserCheck);
  const location = useLocation();

  if (!checkUser) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!isPublic && !user) {
    return (
      <Navigate
        to='/login'
        replace
        state={{
          from: location
        }}
      />
    );
  }

  return <Outlet />;
};
