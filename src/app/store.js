import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../modules/todoSlice/todosSlice.js";

const store = configureStore({
  reducer: {
    todos: todosReducer
  }
})

export default store;