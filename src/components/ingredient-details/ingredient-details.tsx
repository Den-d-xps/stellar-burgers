import { FC } from 'react';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { ingredientsSelectors } from '@selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useSelector((state) => {
    if (!id) return null;
    return ingredientsSelectors.selectIngredientById(state, id);
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
