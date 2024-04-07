import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchLoggedInUserOrders,updateUser,fetchLoggedInUserInfo } from './userAPI';

const initialState = {
  orders: null,
  status: 'idle',
  userInfo: null,//now we will use userInfo for every other info and we will use loggedInUser for id checks
};


export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrdersInfoById',
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);
export const fetchLoggedInUserInfoAsync = createAsyncThunk(
  'user/fetchLoggedInUserInfo',
  async () => {
    const response = await fetchLoggedInUserInfo();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
      
  },
});

export const { increment } = userSlice.actions;

export const selectOrders = (state) => state.user.orders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
