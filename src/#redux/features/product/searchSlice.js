import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchedProducts: []
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    SEARCHED_PRODUCTS (state, action) {
      const { products, searchTerm } = action.payload;
      const tempProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));
      state.searchedProducts = tempProducts;
    }
  }
});

export const { SEARCHED_PRODUCTS } = searchSlice.actions;

export const selectSearchedProducts = (state) => state.search.searchedProducts;

export default searchSlice.reducer;