import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setAuthenticated } from './features/auth/authSlice';

const token = localStorage.getItem('token');

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Initialize auth state based on localStorage
store.dispatch(setAuthenticated(token));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
