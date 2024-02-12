import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const API_URL = 'https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json';

type Characteristic = {
  speed: number;
  force: number;
  engineAmperage: number;
}

export type Train = {
  name: string;
  description: string;
  characteristics: Characteristic[];
}

type TrainsState = {
  isLoading: boolean;
  trains: Train[];
  errorMessage: string | null; 
}

const initialState: TrainsState = {
  isLoading: false,
  trains: [],
  errorMessage: null,
};

export const fetchTrains = createAsyncThunk(
  'trains/fetchTrains',
  async () => {
    const res = await axios(API_URL);
    return res.data;
    }
);

const trainsSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {
    clearApiState: () => ({
      isLoading: false,
      trains: [],
      errorMessage: null,
    }),
    deleteMessageError(state) {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrains.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrains.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Ошибка сервера';
      })
      .addCase(fetchTrains.fulfilled, (state, action: PayloadAction<Train[]>) => {
        state.isLoading = false;
        state.trains = action.payload;
        state.errorMessage = null;
      });
  },
});

export const { clearApiState, deleteMessageError } = trainsSlice.actions;
export default trainsSlice.reducer;
export const getTrainsState = (state: RootState) => state.trainsReducer;