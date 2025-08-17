import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { CONSTRUCTOR_SLICE_NAME } from '../sliceNames/sliceNames';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    reorderIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const element = state.ingredients[from];
      state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, element);
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (i) => i.id !== action.payload.id
        );
      }
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state
  }
});

export const burgerConstructorActions = burgerConstructorSlice.actions;
export const burgerConstructorSelectors = burgerConstructorSlice.selectors;
