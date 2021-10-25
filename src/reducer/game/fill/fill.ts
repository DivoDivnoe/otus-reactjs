import { FillType } from '@/constants';
import { gameProps } from '@/configs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FillType = gameProps.fill;

const fillSlice = createSlice({
  name: 'fill',
  initialState,
  reducers: {
    setFill: (_state, action: PayloadAction<FillType>) => action.payload,
  },
});

export const ActionCreator = fillSlice.actions;
export default fillSlice.reducer;
