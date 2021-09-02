import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HistoryState {
  results: array;
}

const initialState: HistoryState = {
  results: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<object>) => {
      console.log("action", action);
      state.results = [...state.results, [...action.payload]];
    },
  },
});

export const { addResult } = historySlice.actions;

export default historySlice.reducer;
