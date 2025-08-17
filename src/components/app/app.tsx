import '../../index.css';
import styles from './app.module.css';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '@components';
import { useDispatch } from '@store';
import { useEffect } from 'react';
import { fetchOrders, fetchIngredients, fetchUser } from '@thunks';
import { userActions } from '@actions';
import { getCookie } from '@utils-cookie';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(fetchUser())
        .unwrap()
        .catch((error) => console.log(error))
        .finally(() => {
          dispatch(userActions.setUserCheck());
        });
    } else {
      dispatch(userActions.setUserCheck());
    }

    dispatch(fetchIngredients());
    dispatch(fetchOrders());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};
