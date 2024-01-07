import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "http://localhost:8000/api";

//add product
export const addQuotation = createAsyncThunk(
    "quotation/addQuotation",
    async (formData) => {
      const formDatas = JSON.stringify(formData);
      console.log("data", formDatas);
      try {
        const response = await axios.post(`${apiURL}/addQuotation `, formDatas, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        body: formDatas
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

  //quotation list
  export const quotationList = createAsyncThunk(
    "quotation/quotationList",
    async (userId) => {
      console.log("User ID:", userId);
      try {
        const response = await axios.get(`${apiURL}/quotationList/${userId}`);
        console.log("Quotation List Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching quotation list:", error);
        throw error;
      }
    }
  );


  const QuotationSlice = createSlice({
    name: "quotation",
    initialState: {
      loading: false,
      quotation: [],
      error: "",
  },
    
  extraReducers: (builder) => {
    builder
      .addCase(addQuotation.pending, (state) => {
        state.loading = true;
        state.quotation = null;
        state.error = null;
      })
      .addCase(addQuotation.fulfilled, (state, action) => {
        state.loading = false;
        state.quotation = action.payload;
        state.error = null;
      })
    .addCase(addQuotation.rejected, (state, action) => {
        console.error("Error saving quotation:", action.error);
        state.loading = false;
        state.quotation = null;
        state.error = action.error.message;
      })
      //quotationList
      .addCase(quotationList.pending, (state) => {
        state.loading = true;
        state.quotation = null;
        state.error = null;
      })
      .addCase(quotationList.fulfilled, (state, action) => {
        state.loading = false;
        state.quotation = action.payload;
        state.error = null;
      })
      .addCase(quotationList.rejected, (state, action) => {
        state.loading = false;
        state.quotation = null;
        state.error = action.error.message;
      })
    },
  // end reducer here
  });
    
export default QuotationSlice.reducer;