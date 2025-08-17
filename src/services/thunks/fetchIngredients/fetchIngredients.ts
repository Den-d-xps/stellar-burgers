import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../../slices/sliceNames/sliceNames';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetch`,
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);
