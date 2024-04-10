import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menuToggle: false,
  dorpDownToggle: false,
  itemsPerPage: 5
}

const btnSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    SET_DROPDOWN_TOGGLE (state, action) {
      state.dorpDownToggle = action.payload;
    },
    SET_MENU_TOGGLE (state, action) {
      state.menuToggle = action.payload;
    },
    SET_ITEMS_PER_PAGE (state, action) {
      state.itemsPerPage = action.payload;
    }
  }
});

export const { SET_DROPDOWN_TOGGLE, SET_MENU_TOGGLE, SET_ITEMS_PER_PAGE } = btnSlice.actions;
export const selectDorpDownToggle = state => state.button.dorpDownToggle;
export const selectMenuToggle = state => state.button.menuToggle;
export const selectItemsPerPage = state => state.button.itemsPerPage;
export default btnSlice.reducer;