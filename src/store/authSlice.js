import { createSlice } from '@reduxjs/toolkit'

const name = JSON.parse(localStorage.getItem("pinvent-name"));
const loginStatus =  JSON.parse(sessionStorage.getItem("pinvent-loggedIn"));

const initialState = {
  isLoggedIn: loginStatus ? loginStatus : false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    bio: "",
    phone: "",
    photo: ""
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN (state, action) {
      if(action.payload) {
        sessionStorage.setItem("pinvent-loggedIn", JSON.stringify(action.payload));
      }

      state.isLoggedIn = action.payload;
    },
    SET_NAME (state, action) {
      localStorage.setItem("pinvent-name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER (state, action) {
      const profile = action.payload;
      state.user.name = profile?.data?.name;
      state.user.email = profile?.data?.email;
      state.user.phone = profile?.data?.phone;
      state.user.bio = profile?.data?.bio;
      state.user.photo = profile?.data?.photo;
    }
  }
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;