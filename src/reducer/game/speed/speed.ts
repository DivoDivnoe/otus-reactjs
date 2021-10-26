import { SpeedType } from '@/constants';
import { gameProps } from '@/configs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SpeedType = gameProps.speed;

const speedSlice = createSlice({
  name: 'speed',
  initialState,
  reducers: {
    setSpeed: (_state, action: PayloadAction<SpeedType>) => action.payload,
  },
});

export const ActionCreator = speedSlice.actions;
export default speedSlice.reducer;
