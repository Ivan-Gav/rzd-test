import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TrainType } from "./trainsListSlice";
import { RootState } from "../store";

const initialState: TrainType & { isOpen: boolean } = {
  isOpen: false,
  name: '',
  description: '',
  characteristics: [],
}

const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    showTrain: (state, action: PayloadAction<TrainType>) => {
      state.isOpen = true;
      state.name = action.payload.name;
      state.characteristics = action.payload.characteristics;
    }
  }
});

export const { showTrain } = trainSlice.actions;
export default trainSlice.reducer;
export const getTrainState = (state: RootState) => state.trainReducer;