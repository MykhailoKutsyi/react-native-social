import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refresh } from './session-operations';

const initialState = {
  isAuth: false,
  isLoading: false,

  token: null,

  user: {
    name: 'Unknown',
    email: '',
  },
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  extraReducers: {
    [logIn.pending](state) {
      state.isLoading = true;
    },
    [logIn.rejected]() {
      return initialState;
    },
    [logIn.fulfilled](state, { payload }) {
      state.token = payload.token;
      state.isAuth = true;
      state.isLoading = false;
    },

    [logOut.pending](state, _) {
      state.isLoading = true;
    },
    [logOut.rejected](state, _) {
      state.isLoading = false;
    },
    [logOut.fulfilled]() {
      return initialState;
    },
    [refresh.pending](state) {
      state.isLoading = true;
    },
    [refresh.rejected]() {
      return initialState;
    },
    [refresh.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.user = payload;
      state.isAuth = true;
    },
  },
});

export default sessionSlice.reducer;
