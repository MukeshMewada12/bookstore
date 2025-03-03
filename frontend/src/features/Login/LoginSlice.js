import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "./LoginApi";


const savedUser = sessionStorage.getItem("user");
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  isAuthenticated: !!savedUser,  
  error: null,
};


export const submitLogin = createAsyncThunk(
  "auth/submitLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginData); 
      return response; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      sessionStorage.removeItem("user"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        
        
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            
            id: action.payload.user.id,
            username: action.payload.user.name,
            email: action.payload.user.email,
          })
          
        );
        
      })
      .addCase(submitLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed. Please try again.";
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
