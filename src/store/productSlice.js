import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  searchedProducts: [],
  productsForStat: [],
  product: {},
  currentlyShowing: 0,
  storeValue: 0,
  stockOut: 0,
  stockLow: 0,
  totalCategory: 0,
  totalProduct: 0
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ADD_PRODUCT (state, action) {
      const updatedProductList = state.products.concat(action.payload);
      return {...state, products: updatedProductList}
      // state.products.push(action.payload);
    },

    GET_ALL_PRODUCTS (state, action) {
      const updatedProductList = action.payload;
      state.products = updatedProductList;
    },

    DELETE_PRODUCT (state, action) {
      const updatedProductList = state.products.filter(item => item._id !== action.payload);
      return {...state, products: updatedProductList}
    },
    
    SEARCH_PRODUCTS (state, action) {
      const searchTerm = action.payload;
      let tempProducts = [];
      if(searchTerm.length) {
        tempProducts = state.products.filter(product => {
          return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
          product.category.toLowerCase().includes(searchTerm.toLowerCase());
        });
      } else {
        tempProducts = [];
      }
      // state.searchedProducts = [...tempProducts];
      return { ...state, searchedProducts: tempProducts  }
    },

    CURRENTLY_SHOWING (state, action) {
      state.currentlyShowing = action.payload;
    },

    SET_GET_PRODUCT (state, action) {
      state.product = action.payload;
    },

    SET_UPDATE_PRODUCT(state, action) {
      const {id, data} = action.payload;
      const objIndex = state.products.findIndex(obj => obj._id === id);
      state.products[objIndex].name = data?.name;
      state.products[objIndex].category = data?.category;
      state.products[objIndex].price = data?.price;
      state.products[objIndex].quantity = data?.quantity;
      state.products[objIndex].description = data?.description;
      state.products[objIndex].image = data?.image;
    },

    SET_PRODUCTS_FOR_STAT (state, action) {
      state.productsForStat = action.payload;
    }
  }
});

export const { 
  ADD_PRODUCT,
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT, 
  SEARCH_PRODUCTS, 
  CURRENTLY_SHOWING,
  CALC_STORE_VALUE,
  SET_GET_PRODUCT,
  SET_UPDATE_PRODUCT,
  SET_PRODUCTS_FOR_STAT } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;
export const selectProductsForStat = (state) => state.product.productsForStat;
export const selectSearchedProducts = (state) => state.product.searchedProducts;
export const selectCurrentlyShowing = (state) => state.product.currentlyShowing;

export const selectStoreValue = (state) => {
  const products = state.product.productsForStat;
  if(products) {
    const productValue =  products.map(product => product.price * product.quantity);
    const total =  productValue.reduce((acc, item) => {
      return acc + item;
    }, 0); 
    return total;
  }
}

export const selectStockOut = (state) => {
  const products = state.product.productsForStat;
  if(products) {
    const stockOutProducts = products.filter(product => product.quantity < 1);
    return stockOutProducts.length;
  }
}

export const selectStockLow = (state) => {
  const products = state.product.productsForStat;
  if(products) {
    const stockLowProducts = products.filter(product => product.quantity <= 5 && product.quantity > 0);
    return stockLowProducts.length;
  }
}

export const selectTotalCategory = (state) => {
  const products = state.product.productsForStat;
  if(products) {
    const allCat = products.map(product => product.category);
    // return [...new Set(allCat)].length;
    const uniqueCat = allCat.reduce((acc, item) => {
      if(!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
    return uniqueCat.length;
  }
  
}

export const selectTotalProduct = (state) => {
  return state.product.productsForStat.length;
}

export default productSlice.reducer;