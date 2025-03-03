import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAddBook, getAllAddBooks, updateAddBook as updateBookAPI, deleteAddBook as deleteBookAPI } from "./AddBookApi";

// Thunks
export const submitAddBook = createAsyncThunk(
  "AddBook/submitAddBook",
  async (formData, { rejectWithValue }) => {
    try {
      return await createAddBook(formData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllAddBook = createAsyncThunk(
  "AddBook/fetchAllAddBook",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllAddBooks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAddBook = createAsyncThunk(
  "AddBook/updateAddBook",
  async (bookData, { rejectWithValue }) => {
    try {
      return await updateBookAPI(bookData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAddBook = createAsyncThunk(
  "AddBook/deleteAddBook",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBookAPI(id);
      return id; // Returning id so we can remove it from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addBookSlice = createSlice({
  name: "AddBook",
  initialState: {
    books: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Book
      .addCase(submitAddBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAddBook.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.books.push(action.payload);
      })
      .addCase(submitAddBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Books
      .addCase(fetchAllAddBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAddBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        console.log("==========dddddd",action.payload);
      })
      .addCase(fetchAllAddBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Book
      .addCase(updateAddBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })

      // Delete Book
      .addCase(deleteAddBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      });
  },
});

export default addBookSlice.reducer;
