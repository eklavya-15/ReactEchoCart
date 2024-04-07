import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, createUser, signOut } from './authAPI';
import { checkAuth} from './authAPI';
const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  error:null,
  userChecked: false
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);


export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

  export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo, { rejectWithValue }) => {
      try {
        const response = await loginUser(loginInfo);
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
   }
  );

export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async (userId) => {
      const response = await signOut(userId);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userLoggedIn = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      });
     
      
  },
});

//now loggedInuserToken will provide you only the information that user has login but to access the userInfo 
//you can access it using selectUserInfo
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export default counterSlice.reducer;
