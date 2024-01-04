import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "http://localhost:8000/api";
// const apiURL = "https://invoicers.000webhostapp.com/api";
const userId = window.sessionStorage.getItem("id");

const apiUrl = `${apiURL}/productList/${userId}`;
console.log("API URL:", apiUrl);

//add product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData) => {
    console.log("data", formData);
    try {
      const response = await axios.post(`${apiURL}/addProduct `, formData, {
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

//update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData) => {
    try {
      // Make the API request to update the product
      const response = await axios.put(
        `${apiURL}/updateProduct/${productData.id}`,
        productData
      );

      // Log the response data
      console.log("Product updated:", response.data);

      // Return the updated product data
      return response.data;
    } catch (error) {
      // Handle errors, log them, and rethrow
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
);

//product list
export const productList = createAsyncThunk(
  "product/productList",
  async (userId) => {
    console.log("User ID:", userId);
    try {
      const response = await axios.get(`${apiURL}/productList/${userId}`);
      console.log("Product List Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: [],
    error: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.product = null;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.error.message;
      })
      //productList
      .addCase(productList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productList.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(productList.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.error.message;
      })
      //update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.error.message;
      });
  },
  // end reducer here
});

export default ProductSlice.reducer;
