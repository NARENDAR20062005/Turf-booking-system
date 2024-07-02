import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from './slices/bookingsSlice';
import groundsReducer from './slices/groundsSlice';
import scrollPositionReducer from './slices/scrollPositionSlice';
import authReducer from './slices/authSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        bookings: bookingsReducer,
        grounds: groundsReducer,
        scrollPosition: scrollPositionReducer,
    },
});

export default store;


