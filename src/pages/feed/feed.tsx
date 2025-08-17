import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { ordersSelectors } from '@selectors';
import { useDispatch, useSelector } from '@store';
import { fetchOrders } from '@thunks';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();
  const getFeeds = () => {
    dispatch(fetchOrders());
  };

  const orders = useSelector(ordersSelectors.selectOrders);
  const isLoading = useSelector(ordersSelectors.selectStatusLoading);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
