// src/slices/bookingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  upcomingBookings: [],
  previousBookings: [],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings(state, action) {
      const { upcoming, previous } = action.payload;
      state.upcomingBookings = upcoming;
      state.previousBookings = previous;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
