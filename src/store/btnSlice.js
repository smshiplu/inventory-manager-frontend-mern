import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menuToggle: false,
  dorpDownToggle: false
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
    }
  }
});

export const { SET_DROPDOWN_TOGGLE, SET_MENU_TOGGLE } = btnSlice.actions;
export const selectDorpDownToggle = state => state.button.dorpDownToggle;
export const selectMenuToggle = state => state.button.menuToggle;
export default btnSlice.reducer;