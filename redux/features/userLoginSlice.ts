import { ROLES } from "@/config/enums";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  login: false,
  rol: ROLES.USER,
  tokens: {
    refresh: "",
    access: "",
  },
};

export const userLoginSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.first_name = action.payload;
    },
    setLastName: (state, action) => {
      state.last_name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setRol: (state, action) => {
      state.rol = action.payload;
    },
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    logOut: () => initialState,
  },
});

export const {
  setFirstName,
  setLastName,
  setUserEmail,
  setLogin,
  setRol,
  setTokens,
  logOut
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
