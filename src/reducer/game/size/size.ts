import { BoardSize } from '@/constants';
import { gameProps } from '@/configs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BoardSize = gameProps.boardSize;

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    setSize: (_state, action: PayloadAction<BoardSize>) => action.payload,
  },
});

export const ActionCreator = sizeSlice.actions;
export default sizeSlice.reducer;
