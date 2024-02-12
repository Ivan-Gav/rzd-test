import { configureStore } from '@reduxjs/toolkit';
import trainsReducer from './slice/trainsSlice';

export const store = configureStore({
  reducer: {
    trainsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;