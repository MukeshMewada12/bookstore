import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Registration/RegistrationSlice";
import contactReducer from "../features/ContactUs/ContactUsSlice";
import loginReducer from "../features/Login/LoginSlice"
import collegeReducer from "../features/CollegeData/CollegerDataSlice"
import AddBookReducer from "../features/AddBook/AddBookSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    login:loginReducer,
    college:collegeReducer,
    addBook:AddBookReducer,
  },
});

export default store;
