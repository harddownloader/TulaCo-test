import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./Score";
import historyReducer from "./History";
import unitsReducer from "./Units";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    history: historyReducer,
    units: unitsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
