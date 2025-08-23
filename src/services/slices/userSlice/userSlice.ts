import { createSlice } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../sliceNames';
import { TOrder, TUser } from '@utils-types';
import {
  fetchUser,
  fetchUserOrders,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '@thunks';

interface IUserState {
  user: TUser | null;
  orders: TOrder[];
  loading: boolean;
  error: boolean;
  userCheck: boolean;
}

export const initialState: IUserState = {
  user: null,
  orders: [],
  loading: false,
  error: false,
  userCheck: false
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUserCheck: (state) => {
      state.userCheck = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.orders = [];
        state.loading = false;
        state.error = false;
        state.userCheck = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectOrders: (state) => state.orders,
    selectUserCheck: (state) => state.userCheck
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
