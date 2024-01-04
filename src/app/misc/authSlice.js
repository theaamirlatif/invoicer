import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "http://localhost:8000/api";
// const apiURL = "https://invoicers.000webhostapp.com/api";

// http://localhost:8000/api
// https://invoicers.000webhostapp.com/data/storage/app/
// https://invoicers.000webhostapp.com/invoicers/api/

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(`${apiURL}/adminLogIn`, userCredentials ,{
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const response = await request.data;

    if (response && response.id && response.email) {
      window.sessionStorage.setItem("id", response.id);
      return response;
    } else {
      throw new Error("Invalid user credentials");
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData) => {
    try {
      const response = await axios.post(`${apiURL}/adminRegister`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
);

// Async thunk for user registration
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId) => {
    try {

      const response = await axios.get(`${apiURL}/adminDetails/${userId}`);

      console.log("Response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },

  //reducer call here
  extraReducers: (builder) => {
    builder
      // Login reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with request code 401") {
          state.error = "Access Denied! Invalid Credentials.";
        } else {
          state.error = action.error.message;
        }
      })

      // Registration reducers
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })

      // Registration reducers
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
  // end reducer here
});

export default authSlice.reducer;
