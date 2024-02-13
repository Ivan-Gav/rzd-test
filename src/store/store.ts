import { configureStore } from '@reduxjs/toolkit';
import trainsReducer from './slice/trainsListSlice';
import trainReducer from './slice/trainSlice';

export const store = configureStore({
  reducer: {
    trainsReducer,
    trainReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;