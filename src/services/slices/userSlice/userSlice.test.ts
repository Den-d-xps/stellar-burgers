import { userSlice, initialState } from './userSlice';
import {
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  fetchUserOrders,
  logoutUser
} from '@thunks';
import { TUser, TOrder } from '@utils-types';

describe('[userSlice] тесты редьюсеров!', () => {
  const reducer = userSlice.reducer;
  const { setUserCheck } = userSlice.actions;

  const testUser: TUser = {
    email: 'test@test.com',
    name: 'TestUser'
  };

  const testOrder: TOrder = {
    _id: '1',
    number: 12345,
    name: 'Тестовый заказ',
    status: 'done',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    ingredients: ['1', '3', '5', '1']
  };

  it('Должен устанавливать userCheck = true', () => {
    const state = reducer(
      initialState,
      setUserCheck()
    );

    expect(state.userCheck).toBe(true);
  });

  it('Должен устанавливать loading = true при registerUser.pending', () => {
    const state = reducer(
      initialState, 
      { type: registerUser.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен сохранять пользователя при registerUser.fulfilled', () => {
    const state = reducer(
      {...initialState, loading: true},
      { type: registerUser.fulfilled.type, payload: testUser }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.user?.email).toBe('test@test.com');
    expect(state.user?.name).toBe('TestUser');
  });

  it('Должен устанавливать error = true при registerUser.rejected', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: registerUser.rejected.type }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('Должен устанавливать loading = true при loginUser.pending', () => {
    const state = reducer(
      initialState, 
      { type: loginUser.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен обрабатывать loginUser.fulfilled', () => {
    const state = reducer(
      {...initialState, loading: true},
      { type: loginUser.fulfilled.type, payload: testUser }
    );
    
    expect(state.loading).toBe(false);
    expect(state.user?.email).toBe('test@test.com');
    expect(state.user?.name).toBe('TestUser');
  });

  it('Должен устанавливать error = true при loginUser.rejected', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: loginUser.rejected.type }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('Должен устанавливать loading = true при fetchUser.pending', () => {
    const state = reducer(
      initialState, 
      { type: fetchUser.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен обрабатывать fetchUser.fulfilled', () => {
    const state = reducer(
      {...initialState, loading: true},
      { type: fetchUser.fulfilled.type, payload: testUser }
    );
    
    expect(state.loading).toBe(false);
    expect(state.user?.email).toBe('test@test.com');
    expect(state.user?.name).toBe('TestUser');
  });

  it('Должен устанавливать error = true при fetchUser.rejected', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: fetchUser.rejected.type }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('Должен устанавливать loading = true при updateUser.pending', () => {
    const state = reducer(
      initialState, 
      { type: updateUser.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен обрабатывать updateUser.fulfilled', () => {
    const updatedUser = { email: 'new@test.com', name: 'NewUser' };
    const state = reducer(
      { ...initialState, loading: true, user: testUser },
      { type: updateUser.fulfilled.type, payload: updatedUser }
    );
    
    expect(state.loading).toBe(false);
    expect(state.user?.email).toBe('new@test.com');
    expect(state.user?.name).toBe('NewUser');
  });

  it('Должен устанавливать error = true при updateUser.rejected', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: updateUser.rejected.type }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('Должен устанавливать loading = true при fetchUserOrders.pending', () => {
    const state = reducer(
      initialState, 
      { type: updateUser.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен сохранять заказы пользователя при fetchUserOrders.fulfilled', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: fetchUserOrders.fulfilled.type, payload: [testOrder] }
    );
    expect(state.orders.length).toBe(1);
    expect(state.orders[0].number).toBe(12345);
  });

  it('Должен устанавливать error = true при fetchUserOrders.rejected', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: fetchUserOrders.rejected.type }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('Должен устанавливать loading = true при logoutUser.pending', () => {
    const state = reducer(
      initialState, 
      { type: logoutUser.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен сбрасывать стейт при logoutUser.fulfilled', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: logoutUser.fulfilled.type }
    );

    expect(state.user).toBeNull();
    expect(state.orders).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.userCheck).toBe(false);
  });

  it('Должен устанавливать error = true при logoutUser.rejected', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: logoutUser.rejected.type }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });
});
