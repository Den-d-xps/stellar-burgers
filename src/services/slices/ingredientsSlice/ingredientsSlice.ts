import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '../sliceNames/sliceNames';
import { fetchIngredients } from '@thunks';

interface IIngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: boolean;
}

const initialState: IIngredientsState = {
  items: [],
  loading: false,
  error: false
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.items = action.payload;
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  selectors: {
    selectIngredients: (state) => state.items,
    selectIngredientById: (state, id: string) =>
      state.items.find((i) => i._id === id),
    selectLoading: (state) => state.loading
  }
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsSelectors = ingredientsSlice.selectors;
