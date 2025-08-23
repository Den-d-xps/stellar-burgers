import { burgerConstructorSlice, initialState } from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';

describe('[burgerConstructorSlice] тесты редьесеров!', () => {
  const reducer = burgerConstructorSlice.reducer;
  const { addIngredient, removeIngredient, reorderIngredient, resetConstructor } = burgerConstructorSlice.actions;

  const testBun: TIngredient = {
    _id: "1",
    name: "Тестовый ингредиент булка-1",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-large.png"
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

  it('Должен добавить булку', () => {
    const stateWithBun = reducer(
      initialState,
      addIngredient(testBun)
    );

    expect(stateWithBun.bun?.type).toBe('bun');
    expect(stateWithBun.bun?.id).toBeDefined();
  });

  it('Должен заменить булку', () => {
    const stateWithBun = { ...initialState, bun: {...testBun, id:'id'} };
    const anotherBun: TIngredient = { ...testBun, _id: '2', name: 'Тестовый ингредиент булка-2' };

    const stateWithNewBun = reducer(
      stateWithBun,
      addIngredient(anotherBun)
    );

    expect(stateWithNewBun.bun?._id).toBe('2');
    expect(stateWithNewBun.bun?.id).toBeDefined();
  })

  it('Должен добавить ингредиент (не булку)', () => {
    const state = reducer(
      initialState,
      addIngredient(testIngredient)
    );
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toMatchObject({
      _id: testIngredient._id
    });
    expect(state.ingredients[0].id).toBeDefined();
  });

  it('Должен поменять порядок ингредиентов', () => {
    const first = { ...testIngredient, _id: 'i1' };
    const second = { ...testIngredient, _id: 'i2' };
    let state = reducer(initialState, addIngredient(first));
    state = reducer(state, addIngredient(second));

    const reordered = reducer(
      state,
      reorderIngredient({ from: 0, to: 1 })
    );

    expect(reordered.ingredients[0]._id).toBe('i2');
    expect(reordered.ingredients[1]._id).toBe('i1');
  });

  it('Должен удалить булку', () => {
    let state = reducer(initialState, addIngredient(testBun));
    expect(state.bun).not.toBeNull();

    state = reducer(state, removeIngredient(state.bun!));
    expect(state.bun).toBeNull();
  });

  it('Должен удалить ингредиент', () => {
    let state = reducer(initialState, addIngredient(testIngredient));
    const addedIngredient = state.ingredients[0];

    state = reducer(state, removeIngredient(addedIngredient));
    expect(state.ingredients.length).toBe(0);
  });

  it('Должен сбросить конструктор в начальное состояние', () => {
    let state = reducer(initialState, addIngredient(testBun));
    state = reducer(state, addIngredient(testIngredient));

    state = reducer(state, resetConstructor());
    expect(state).toEqual(initialState);
  });
});
