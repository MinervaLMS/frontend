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
    setSelectedModule: (state, action) => {
      state.selectedModule = action.payload;
    },
  },
});

export const { setOpen, setSelectedModule } = drawerSlice.actions;

export default drawerSlice.reducer;
