import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface Coords {
  x: number;
  y: number;
}

const modelSlice = createSlice({
  name: 'model',
  initialState: [[]] as Model,
  reducers: {
    setModel: (_state, action: PayloadAction<Model>) => action.payload,
    updateModel: (state, action: PayloadAction<Coords>) => {
      const { x, y } = action.payload;

      state[y][x] =
        state[y][x] === CellState.DEAD ? CellState.ALIVE : CellState.DEAD;
      return state;
    },
  },
});

export const ActionCreator = modelSlice.actions;
export default modelSlice.reducer;
