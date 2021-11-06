import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FillType {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface BoardFillPercentageType {
  [FillType.HIGH]: number;
  [FillType.MEDIUM]: number;
  [FillType.LOW]: number;
}

export const BoardFillPercentage: BoardFillPercentageType = {
  [FillType.HIGH]: 0.3,
  [FillType.MEDIUM]: 0.2,
  [FillType.LOW]: 0.1,
};

const fillSlice = createSlice({
  name: 'fill',
  initialState: FillType.MEDIUM,
  reducers: {
    setFill: (_state: FillType, action: PayloadAction<FillType>) =>
      action.payload,
  },
});

export const ActionCreator = fillSlice.actions;
export default fillSlice.reducer;
