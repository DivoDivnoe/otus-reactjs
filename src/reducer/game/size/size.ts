import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum BoardSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export interface SizeProps {
  width: number;
  height: number;
}

export interface BoardSizeValueType {
  [BoardSize.LARGE]: SizeProps;
  [BoardSize.MEDIUM]: SizeProps;
  [BoardSize.SMALL]: SizeProps;
}

export const BoardSizeValue: BoardSizeValueType = {
  [BoardSize.LARGE]: { width: 100, height: 80 },
  [BoardSize.MEDIUM]: { width: 70, height: 50 },
  [BoardSize.SMALL]: { width: 50, height: 30 },
};

const sizeSlice = createSlice({
  name: 'size',
  initialState: BoardSize.MEDIUM,
  reducers: {
    setSize: (_state, action: PayloadAction<BoardSize>) => action.payload,
  },
});

export const ActionCreator = sizeSlice.actions;
export default sizeSlice.reducer;
