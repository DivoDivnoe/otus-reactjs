import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SpeedType {
  FAST = 'fast',
  MEDIUM = 'medium',
  SLOW = 'slow',
}

export interface SpeedValueType {
  [SpeedType.FAST]: number;
  [SpeedType.MEDIUM]: number;
  [SpeedType.SLOW]: number;
}

// timeout interval ms
export const SpeedValue: SpeedValueType = {
  [SpeedType.FAST]: 30,
  [SpeedType.MEDIUM]: 150,
  [SpeedType.SLOW]: 500,
};

const speedSlice = createSlice({
  name: 'speed',
  initialState: SpeedType.MEDIUM,
  reducers: {
    setSpeed: (_state, action: PayloadAction<SpeedType>) => action.payload,
  },
});

export const ActionCreator = speedSlice.actions;
export default speedSlice.reducer;
