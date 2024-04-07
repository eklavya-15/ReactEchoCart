import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart ,fetchsCartItemByUserId,updateCart,deleteItemFromCart,resetCart} from './cartAPI';

const initialState = {
  cartLoaded: false,
  items:[],
  status: 'idle',
};
let index = null;

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchsCartItemByUserIdAsync = createAsyncThunk(
  'cart/fetchsCartItemByUserId',
  async (userId) => {
    const response = await fetchsCartItemByUserId(userId);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (id) => {
    const response = await resetCart(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload)
      })
      .addCase(fetchsCartItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchsCartItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items =  action.payload
        state.cartLoaded = true;
      })
      .addCase(fetchsCartItemByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        index = state.items.findIndex(item=> item.id === action.payload.id)
        state.items[index] =  action.payload
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(action.payload);
        index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const { increment, } = counterSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;
// export const selectedItem = (state) => state.cart.items[index];


export default counterSlice.reducer;
