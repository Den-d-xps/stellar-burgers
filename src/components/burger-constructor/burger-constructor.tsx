import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { burgerConstructorSelectors, ordersSelectors } from '@selectors';
import { useNavigate } from 'react-router-dom';
import { addNewOrder } from '@thunks';
import { getCookie } from '@utils-cookie';
import { burgerConstructorActions, ordersActions } from '@actions';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    burgerConstructorSelectors.selectBurgerConstructor
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = useSelector(ordersSelectors.selectNewOrderLoading);

  const orderModalData = useSelector(ordersSelectors.selectNewOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!constructorItems.ingredients.length) return;
    if (!getCookie('accessToken')) return;
    const ingredientIds = constructorItems.ingredients.map(
      (item: TConstructorIngredient) => item._id
    );
    const allIngredients = [
      constructorItems.bun._id,
      ...ingredientIds,
      constructorItems.bun._id
    ];

    dispatch(addNewOrder(allIngredients));
  };
  const closeOrderModal = () => {
    dispatch(ordersActions.resetNewOrder());
    dispatch(burgerConstructorActions.resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
