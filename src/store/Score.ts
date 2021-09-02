import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScoreState {
  value: number;
}

const initialState: ScoreState = {
  value: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = scoreSlice.actions;

export default scoreSlice.reducer;
