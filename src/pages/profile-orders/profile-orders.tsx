import { userSelectors } from '@selectors';
import { useDispatch, useSelector } from '@store';
import { fetchUserOrders } from '@thunks';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const orders = useSelector(userSelectors.selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
