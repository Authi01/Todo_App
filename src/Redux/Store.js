import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
