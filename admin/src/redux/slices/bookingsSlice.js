// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import { BASE_URL } from '../../utils/helper';

// // const initialState = {
// //   bookings: [],
// //   upcomingBookings: [],
// //   previousBookings: [],
// //   loading: false,
// //   error: null,
// // };

// // export const fetchBookings = createAsyncThunk(
// //   'bookings/fetchBookings',
// //   async (_, { getState }) => {
// //     const token = getState().auth.token;
// //     try {
// //       const { data } = await axios.get(`${BASE_URL}/api/v1/admin/bookings`, {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //         },
// //       });
// //       return data.bookings;
// //     } catch (error) {
// //       throw error;
// //     }
// //   }
// // );

// // const bookingsSlice = createSlice({
// //   name: 'bookings',
// //   initialState,
// //   reducers: {},
// //   extraReducers: {
// //     [fetchBookings.pending]: (state) => {
// //       state.loading = true;
// //       state.error = null;
// //     },
// //     [fetchBookings.fulfilled]: (state, action) => {
// //       state.loading = false;
// //       state.bookings = action.payload;
// //       const today = new Date().toISOString().slice(0, 10);
// //       state.upcomingBookings = action.payload
// //         .filter((booking) => booking.date >= today)
// //         .sort((a, b) => new Date(a.date) - new Date(b.date));
// //       state.previousBookings = action.payload.filter((booking) => booking.date < today);
// //     },
// //     [fetchBookings.rejected]: (state, action) => {
// //       state.loading = false;
// //       state.error = action.error.message;
// //     },
// //   },
// // });

// // export default bookingsSlice.reducer;




// // src/redux/slices/bookingsSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_URL } from '../../utils/helper';

// const initialState = {
//   bookings: [],
//   upcomingBookings: [],
//   previousBookings: [],
//   status: 'idle',
//   error: null,
// };

// export const fetchAllBookings = createAsyncThunk(
//   'bookings/fetchAllBookings',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/api/v1/admin/bookings`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         const today = new Date().toISOString().slice(0, 10);

//         const upcoming = response.data.bookings
//           .filter(booking => booking.date >= today)
//           .sort((a, b) => new Date(a.date) - new Date(b.date));

//         const previous = response.data.bookings.filter(booking => booking.date < today);

//         return { upcoming, previous };
//       } else {
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const bookingsSlice = createSlice({
//   name: 'bookings',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllBookings.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAllBookings.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.bookings = action.payload;

//         const today = new Date().toISOString().slice(0, 10);
//         state.upcomingBookings = action.payload
//           .filter(booking => booking.date >= today)
//           .sort((a, b) => new Date(a.date) - new Date(b.date));

//         state.previousBookings = action.payload.filter(booking => booking.date < today);
//       })
//       .addCase(fetchAllBookings.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default bookingsSlice.reducer;


