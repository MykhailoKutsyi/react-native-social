import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://react-native-social-backend.herokuapp.com/';

// axios.defaults.baseURL = 'https://localhost:5000';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

// const register = createAsyncThunk(
//   'register',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       await axios.post('/api/auth/register', credentials);
//     } catch (error) {
//       if (error.response.status === 409) {
//         toast.error('Sorry, this email in use!');
//         return rejectWithValue();
//       }
//       toast.error(error.message);
//       return rejectWithValue();
//     }
//   }
// );

const logIn = createAsyncThunk(
  '/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('api/auth/login', credentials);
      token.set(data.token);
      // toast('Welcome to wallet');
      console.log('data', data);
      return data;
    } catch (error) {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
      // toast.error(error.response.data.message);
      return rejectWithValue();
    }
  }
);

// const logOut = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axios.get('/api/auth/logout');
//       token.unset('');
//     } catch (error) {
//       toast.error('Something went wrong. Try again,please');
//       return rejectWithValue();
//     }
//   }
// );

// const refresh = createAsyncThunk(
//   'auth/refresh',
//   async (_, { getState, rejectWithValue }) => {
//     const state = getState();
//     const localStorageToken = state.session.token;

//     if (localStorageToken === null) return rejectWithValue();

//     token.set(localStorageToken);
//     try {
//       const { data } = await axios.get('/api/auth/current');
//       return data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         toast.error('Session expired. Please, log in again');
//       }
//       return rejectWithValue();
//     }
//   }
// );

export { logIn };
// export { register, logIn, logOut, refresh };
