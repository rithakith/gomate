import { configureStore } from '@reduxjs/toolkit';
import journeysReducer from './journeysSlice';

export const store = configureStore({
  reducer: {
    journeys: journeysReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
