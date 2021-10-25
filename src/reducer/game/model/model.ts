import { BoardSize } from '@/constants';
import { createZeroMatrix, Model } from '@/core/core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Model = [[]];

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setModel: (_state, action: PayloadAction<Model>) => action.payload,
    resetModel: (_state, action: PayloadAction<BoardSize>) =>
      createZeroMatrix(action.payload),
  },
});

export const ActionCreator = modelSlice.actions;
export default modelSlice.reducer;
