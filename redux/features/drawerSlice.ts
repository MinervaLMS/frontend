import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  selectedModule: 0,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
  },
});

export const { setOpen } = drawerSlice.actions;

export default drawerSlice.reducer;
