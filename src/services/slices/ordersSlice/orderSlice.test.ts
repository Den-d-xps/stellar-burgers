import { ordersSlice, initialState } from './ordersSlice';
import { fetchOrders, addNewOrder } from '@thunks';
import { TOrder, TOrdersData } from '@utils-types';

describe('[ordersSlice] тесты редьюсеров!', () => {
  const reducer = ordersSlice.reducer;
  const { resetNewOrder } = ordersSlice.actions;

  const testOrder: TOrder = {
    _id: '1',
    number: 12345,
    name: 'Тестовый заказ',
    status: 'done',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    ingredients: ['1', '3', '5', '1']
  };

  const testOrdersData: TOrdersData = {
    orders: [testOrder],
    total: 10,
    totalToday: 5
  };

  it('Должен сбрасывать newOrder через resetNewOrder', () => {
    const stateWithOrder = {... initialState, newOrder: testOrder};

    const state = reducer(stateWithOrder, resetNewOrder());
    expect(state.newOrder).toBeNull();
  });

  it('Должен устанавливать loading = true при fetchOrders.pending', () => {
    const state = reducer(initialState, { type: fetchOrders.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен сохранять данные заказов при fetchOrders.fulfilled', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: fetchOrders.fulfilled.type, payload: testOrdersData }
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.orderData.orders[0].number).toBe(12345);
    expect(state.orderData.total).toBe(10);
    expect(state.orderData.totalToday).toBe(5);
  });

  it('Должен устанавливать error = true при fetchOrders.rejected', () => {
    const state = reducer(
      {...initialState, loading: true},
      { type: fetchOrders.rejected.type }
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('Должен устанавливать newOrderLoading = true при addNewOrder.pending', () => {
    const state = reducer(initialState, { type: addNewOrder.pending.type });
    expect(state.newOrderLoading).toBe(true);
    expect(state.error).toBe(false);
  });

  it('Должен сохранять новый заказ при addNewOrder.fulfilled', () => {
    const state = reducer(
      { ...initialState, newOrderLoading: true },
      { type: addNewOrder.fulfilled.type, payload: testOrder }
    );

    expect(state.newOrderLoading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.newOrder?.number).toBe(12345);
  });

  it('Должен устанавливать error = true при addNewOrder.rejected', () => {
    const state = reducer(
      { ...initialState, newOrderLoading: true },
      { type: addNewOrder.rejected.type }
    );

    expect(state.newOrderLoading).toBe(false);
    expect(state.error).toBe(true);
  });
});
