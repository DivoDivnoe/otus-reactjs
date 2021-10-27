import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserType = string | null;

export interface UserState {
  userData: UserType;
}

const initialState: UserState = {
  userData: null,
};
Object.freeze(initialState);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.userData = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const ActionCreator = userSlice.actions;
export default userSlice.reducer;
