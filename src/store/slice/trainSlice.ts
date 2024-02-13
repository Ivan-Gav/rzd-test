import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Characteristic, TrainType } from "./trainsListSlice";
import { RootState } from "../store";


type setCharacteristicValueType = {
  index: number;
  type: keyof Characteristic;
  value: number;
};

type setCharacteristicValidType = {
  index: number;
  type: keyof Characteristic;
  isValid: boolean;
};

type TrainState = TrainType & { isOpen: boolean, isValidArray: {[key in keyof Characteristic]: boolean}[]};

const initialState: TrainState = {
  isOpen: false,
  name: '',
  description: '',
  characteristics: [],
  isValidArray: [],
}

const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    showTrain: (state, action: PayloadAction<TrainType>) => {
      state.isOpen = true;
      state.name = action.payload.name;
      state.characteristics = action.payload.characteristics;
      state.isValidArray = Array(action.payload.characteristics.length).fill({ speed: true, force: true, engineAmperage: true });
    },
    setCharacteristicValue: (state, action: PayloadAction<setCharacteristicValueType>) => {
      state.characteristics[action.payload.index][action.payload.type] = action.payload.value;
    },
    setCharacteristicValid: (state, action: PayloadAction<setCharacteristicValidType>) => {
      state.isValidArray[action.payload.index][action.payload.type] = action.payload.isValid;
    },
  }
});

export const { showTrain, setCharacteristicValid, setCharacteristicValue } = trainSlice.actions;
export default trainSlice.reducer;
export const getTrainState = (state: RootState) => state.trainReducer;