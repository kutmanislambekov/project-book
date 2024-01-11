import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from './api';

const initialState = {
  query: '',
  items: [],
  loading: false,
  startIndex: 0,
  totalItems: 0,
  selectedCategory: 'all',
  selectedSorting: 'relevance',
  selectedBook: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params, { getState }) => {
  const { query, startIndex, selectedCategory, selectedSorting } = getState().books;
  try {
    // const response = await axios.get(
    //   `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=30&key=AIzaSyDslXGJJJ-DvHjJqyEGHvQ7jxFchthL7VA`
    // );
    const response = await api.getBooks({ q: query, startIndex, maxResults: 30 })
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
});

export const fetchBookDetails = createAsyncThunk('books/fetchBookDetails', async (bookId) => {
  try {
    console.log(bookId);
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении деталей книги:', error);
    throw error;
  }
});

const bookSlice = createSlice({
  name: 'books',
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
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    }, // Added setSelectedBook reducer
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.items = [...state.items, ...(action.payload.items || [])];
      state.totalItems = action.payload.totalItems || 0;
      state.startIndex = state.startIndex + 30;
      state.loading = false;
    });

    builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
      state.selectedBook = action.payload;
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
  setSelectedBook,
} = bookSlice.actions;

export default bookSlice.reducer;
