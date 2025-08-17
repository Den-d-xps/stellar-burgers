import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '@store';
import { burgerConstructorActions } from '@actions';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(
        burgerConstructorActions.reorderIngredient({
          from: index,
          to: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        burgerConstructorActions.reorderIngredient({
          from: index,
          to: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(burgerConstructorActions.removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
