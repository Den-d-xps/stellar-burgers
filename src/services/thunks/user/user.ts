import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slices/sliceNames';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '@utils-cookie';

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  `${USER_SLICE_NAME}/register`,
  async (registerData) => {
    const res = await registerUserApi(registerData);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  `${USER_SLICE_NAME}/login`,
  async (loginData) => {
    const res = await loginUserApi(loginData);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const fetchUser = createAsyncThunk<TUser>(
  `${USER_SLICE_NAME}/fetch`,
  async () => {
    const res = await getUserApi();
    return res.user;
  }
);

export const updateUser = createAsyncThunk<TUser, TRegisterData>(
  `${USER_SLICE_NAME}/update`,
  async (data) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const fetchUserOrders = createAsyncThunk<TOrder[]>(
  `${USER_SLICE_NAME}/fetchOrders`,
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);

export const logoutUser = createAsyncThunk<void>(
  `${USER_SLICE_NAME}/logout`,
  async () => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);
