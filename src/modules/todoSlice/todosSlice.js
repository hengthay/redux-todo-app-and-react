import { createSlice } from "@reduxjs/toolkit";

// InitialState for todos app
const initialState = JSON.parse(localStorage.getItem("todos")) || [];

// Set Item to localStorage
const setToLocalStorage = (state) => {
  localStorage.setItem("todos", JSON.stringify(state));
}

// Slice
export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    // Performance addTodo
    addTodo: (state, action) => {
      // Initial new todo
      const newTodo = {
        id: Date.now(),
        title: action.payload,
        completed: false
      }
      state.push(newTodo);

      setToLocalStorage(state);
    },

    deleteTodo: (state, action) => {
      // Filter to deleteTodo from list
      const deleteItem = state.filter(todo => todo.id !== action.payload)

      setToLocalStorage(deleteItem);

      return deleteItem;
    },
    
    editTodo: (state, action) => {
      // Retrive data from action
      const {id, title} = action.payload;
      // Find if that todo existing
      const todo = state.find((todo) => todo.id === id);
      // If it is, set new title to it.
      if(todo) {
        todo.title = title;
      }

      setToLocalStorage(state);
    },

    toggleTodo: (state, action) => {
      // Check to performance if it is completed
      const todo = state.find(t => t.id === action.payload);
      if(todo) todo.completed = !todo.completed;

      setToLocalStorage(state);
    }
  }
})

export const {addTodo, deleteTodo, editTodo, toggleTodo} = todosSlice.actions;
export default todosSlice.reducer;