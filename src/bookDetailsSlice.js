import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  query: '',
  items: [],
  loading: false,
  startIndex: 0,
  totalItems: 0,
  selectedCategory: 'all',
  selectedSorting: 'relevance',
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params, { getState }) => {
  const { query, startIndex, selectedCategory, selectedSorting } = getState().books;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/`+params.id
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
});

const bookSlice = createSlice({
  name: 'bookDetails',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStartIndex: (state, action) => {
      state.startIndex = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSorting: (state, action) => {
      state.selectedSorting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.items = [...state.items, ...(action.payload.items || [])];
      state.totalItems = action.payload.totalItems || 0;
      state.startIndex = state.startIndex + 30;
      state.loading = false;
    });
  },
});

export const {
  setQuery,
  setItems,
  setLoading,
  setStartIndex,
  setTotalItems,
  setSelectedCategory,
  setSelectedSorting,
} = bookSlice.actions;

export default bookSlice.reducer;
