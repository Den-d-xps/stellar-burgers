import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '@store';
import { ordersSelectors } from '@selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(ordersSelectors.selectOrders);
  const feed = {
    total: useSelector(ordersSelectors.selectTotal),
    totalToday: useSelector(ordersSelectors.selectTotalToday)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
