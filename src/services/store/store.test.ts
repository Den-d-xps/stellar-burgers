import { combineSlices } from '@reduxjs/toolkit';
import {
  burgerConstructorSlice,
  ingredientsSlice,
  ordersSlice,
  userSlice
} from '@slices';

describe('[rootReducer] тест глобального стора', () => {
  it('Должен корректно инициализироваться', () => {
    const rootReducer = combineSlices(
      burgerConstructorSlice,
      ingredientsSlice,
      ordersSlice,
      userSlice
    );
    
    const state = rootReducer(undefined, { type: '' });

    expect(state).toEqual({
      burgerConstructor: burgerConstructorSlice.getInitialState(),
      ingredients: ingredientsSlice.getInitialState(),
      order: ordersSlice.getInitialState(),
      user: userSlice.getInitialState()
    });
  });
});
