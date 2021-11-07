import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSize } from '@/modules/game/size';
import { createZeroMatrix } from '@/modules/game/core';

export type Binary = 0 | 1;
export type Model = Binary[][];
export interface CellStateType {
  DEAD: Binary;
  ALIVE: Binary;
}

export const CellState: CellStateType = {
  DEAD: 0,
  ALIVE: 1,
};

const modelSlice = createSlice({
  name: 'model',
  initialState: [[]] as Model,
  reducers: {
    setModel: (_state, action: PayloadAction<Model>) => action.payload,
    resetModel: (_state, action: PayloadAction<BoardSize>) =>
      createZeroMatrix(action.payload),
  },
});

export const ActionCreator = modelSlice.actions;
export default modelSlice.reducer;
