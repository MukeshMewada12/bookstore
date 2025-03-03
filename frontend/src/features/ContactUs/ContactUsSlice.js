
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createContactUs, getContactUs } from "./ContactUsApi";


export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      return await createContactUs(formData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchAllContacts = createAsyncThunk(
  "contact/fetchAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await getContactUs();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    formData: {
      name: "",
      email: "",
      mobile_number: "",
      subject: "",
      message: "",
    },
    contacts: [],  
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetForm: (state) => {
      state.formData = {
        name: "",
        email: "",
        mobile_number: "",
        subject: "",
        message: "",
      };
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, resetForm } = contactSlice.actions;
export default contactSlice.reducer;
