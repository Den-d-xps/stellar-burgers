import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { userSelectors } from '@selectors';

export const AppHeader: FC = () => {
  const user = useSelector(userSelectors.selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
