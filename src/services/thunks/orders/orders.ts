import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../../slices/sliceNames/sliceNames';
import { getFeedsApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchOrders = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetch`,
  async () => {
    const res = await getFeedsApi();
    return res;
  }
);

export const addNewOrder = createAsyncThunk<TOrder, string[]>(
  `${ORDER_SLICE_NAME}/addNewOrder`,
  async (ingredints) => {
    const res = await orderBurgerApi(ingredints);
    return res.order;
  }
);
