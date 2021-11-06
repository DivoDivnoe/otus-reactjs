import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false;

const isPlayingSlice = createSlice({
  name: 'isPlaying',
  initialState,
  reducers: {
    setPlaying: (_state, action: PayloadAction<boolean>) => action.payload,
    startPlaying: () => true,
    stopPlaying: () => false,
  },
});

export const ActionCreator = isPlayingSlice.actions;
export default isPlayingSlice.reducer;
