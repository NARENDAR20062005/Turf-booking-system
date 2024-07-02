import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import groundReducer from './slices/groundsSlice';
import scrollPositionReducer from './slices/scrollPositionSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        ground: groundReducer,
        scrollPosition: scrollPositionReducer,
    },
});

export default store;

