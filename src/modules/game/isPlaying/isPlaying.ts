import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const isPlayingSlice = createSlice({
  name: 'isPlaying',
  initialState,
  reducers: {
    startPlaying: () => true,
    stopPlaying: () => false,
  },
});

export const ActionCreator = isPlayingSlice.actions;
export default isPlayingSlice.reducer;
