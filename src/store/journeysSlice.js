import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  journeys: [],
  favourites: [],
  loading: false,
  error: null,
};

const journeysSlice = createSlice({
  name: 'journeys',
  initialState,
  reducers: {
    setJourneys: (state, action) => {
      state.journeys = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    toggleFavourite: (state, action) => {
      const journeyId = action.payload;
      const index = state.favourites.findIndex(id => id === journeyId);

      if (index !== -1) {
        // Remove from favourites
        state.favourites.splice(index, 1);
      } else {
        // Add to favourites
        state.favourites.push(journeyId);
      }

      // Persist to AsyncStorage
      AsyncStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    loadFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  },
});

export const {
  setJourneys,
  setLoading,
  setError,
  toggleFavourite,
  loadFavourites,
} = journeysSlice.actions;

export default journeysSlice.reducer;
