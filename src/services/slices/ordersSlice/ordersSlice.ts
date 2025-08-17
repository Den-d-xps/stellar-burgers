import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../sliceNames/sliceNames';
import { TOrder, TOrdersData } from '@utils-types';
import { fetchOrders } from '@thunks';
import { addNewOrder } from '@thunks';

interface IOrdersState {
  orderData: TOrdersData;
  newOrder: TOrder | null;
  newOrderLoading: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: IOrdersState = {
  orderData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  newOrder: null,
  newOrderLoading: false,
  loading: false,
  error: false
};

export const ordersSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetNewOrder: (state) => {
      state.newOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.orderData = action.payload;
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addNewOrder.pending, (state) => {
        state.newOrderLoading = true;
        state.error = false;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.newOrder = action.payload;
        state.newOrderLoading = false;
        state.error = false;
      })
      .addCase(addNewOrder.rejected, (state) => {
        state.newOrderLoading = false;
        state.error = true;
      });
  },
  selectors: {
    selectOrders: (state) => state.orderData.orders,
    selectOrderByNumber: (state, number: number) =>
      state.orderData.orders.find((order) => order.number === number),
    selectNewOrder: (state) => state.newOrder,
    selectNewOrderLoading: (state) => state.newOrderLoading,
    selectTotal: (state) => state.orderData.total,
    selectTotalToday: (state) => state.orderData.totalToday,
    selectStatusLoading: (state) => state.loading
  }
});

export const ordersActions = ordersSlice.actions;
export const ordersSelectors = ordersSlice.selectors;
