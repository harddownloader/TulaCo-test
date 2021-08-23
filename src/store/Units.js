import { createSlice } from "@reduxjs/toolkit";

export interface UnitsState {
  selsius: boolean;
}

const initialState: UnitsState = {
  selsius: true,
};

export const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    setFahrenheit: (state) => {
      state.selsius = false;
    },
    setSelsius: (state) => {
      state.selsius = true;
    },
  },
});

export const { setFahrenheit, setSelsius } = unitsSlice.actions;

export default unitsSlice.reducer;
