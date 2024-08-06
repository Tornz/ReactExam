import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducer/User/userSlice';

const store = configureStore({
  reducer: {
    userContext: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
