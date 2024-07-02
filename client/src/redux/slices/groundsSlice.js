// src/slices/groundsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  grounds: [],
  currentGround: {},
};

const groundsSlice = createSlice({
  name: 'grounds',
  initialState,
  reducers: {
    setGrounds(state, action) {
      state.grounds = action.payload;
    },
    setGround(state, action) {
      state.currentGround = action.payload;
    },
  },
});

export const { setGrounds, setGround } = groundsSlice.actions;
export default groundsSlice.reducer;
