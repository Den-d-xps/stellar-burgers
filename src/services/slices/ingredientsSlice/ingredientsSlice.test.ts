import { ingredientsSlice } from './ingredientsSlice';
import { fetchIngredients } from '@thunks';
import { TIngredient } from '@utils-types';

describe('[ingredientsSlice] тесты редьюсеров!', () => {
  const reducer = ingredientsSlice.reducer;
  const { setIngredients } = ingredientsSlice.actions;

  const initialState = {
  items: [],
  loading: false,
  error: false
};

  const testIngredient: TIngredient = {
    _id: "3",
    name: "Тестовый ингредиент котлета-1",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png"
  };

  it('Должен установить ингредиенты через setIngredients', () => {
    const state = reducer(initialState, setIngredients([testIngredient]));
    expect(state.items.length).toBe(1);
    expect(state.items[0]._id).toBe('3');
  });

  it('Должен изменить состояние при fetchIngredients.pending', () => {
    const state = reducer(initialState, { type: fetchIngredients.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен изменить состояние при fetchIngredients.fulfilled', () => {
    const state = reducer(
      { ... initialState, loading: true },
      { type: fetchIngredients.fulfilled.type, payload: [testIngredient] }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.items.length).toBe(1);
    expect(state.items[0]._id).toBe('3');
  });

  it('Должен изменить состояние при fetchIngredients.rejected', () => {
    const state = reducer(
      { ... initialState, loading: true },
      { type: fetchIngredients.rejected.type }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });
});

