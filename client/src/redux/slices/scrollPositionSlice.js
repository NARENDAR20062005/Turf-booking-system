import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scrollPosition: 0,
};

export const scrollPositionSlice = createSlice({
  name: 'scrollPosition',
  initialState,
  reducers: {
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
  },
});

export const { setScrollPosition } = scrollPositionSlice.actions;

export default scrollPositionSlice.reducer;
