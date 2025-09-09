import React, { useState } from 'react'
import AddTodo from './AddTodo'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, editTodo, toggleTodo } from '../modules/todoSlice/todosSlice.js';

const Home = () => {
  // Get data from slice
  const todos = useSelector(state => state.todos);
  // Get dispatch function
  const dispatch = useDispatch();
  // State to store id and new title
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  // Handle on save change
  const handleSaveButton = () => {
    dispatch(editTodo({ id: editId, title: newTitle }));
    setEditId(false);
  }
  // Handle on edit todo
  const handleEditButton = (id, currentTitle) => {
    setNewTitle(currentTitle);
    setEditId(id);
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-start pt-16 bg-gray-100'>
      <div className='w-full md:max-w-2xl sm:max-w-xl mx-auto p-8 bg-white rounded-xl shadow-2xl space-y-8'>
        {/* Header Section */}
        <div className='space-y-3 text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>
            Todo App with React Redux
          </h1>
          <p className='text-lg text-gray-600'>
            You can add your todo list below
          </p>
        </div>

        {/* AddTodo Component */}
        <AddTodo />

        {/* Todo List Section */}
        <ul className='flex flex-col mx-auto space-y-4 md:w-[600px] max-sm:max-w-[400px]'>
          {
            todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200
                  ${todo.completed
                      ? 'bg-gray-200 text-gray-400 line-through'
                      : 'bg-white shadow-md hover:shadow-lg'
                    }`
                  }
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodo(todo.id))}
                      className="w-5 h-5 cursor-pointer accent-blue-500"
                    />
                    {editId === todo.id ? (
                      <input
                        type='text'
                        value={newTitle}
                        className='md:w-[300px] w-[120px] py-1.5 px-3 border border-gray-300 rounded-md outline-0 focus:outline-1 focus:outline-pink-500 placeholder:text-[15px]'
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                    ) : (
                      <span className="text-lg">{todo.title}</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {editId === todo.id ? (
                      <button
                        onClick={() => handleSaveButton()}
                        className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditButton(todo.id, todo.title)}
                        className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => dispatch(deleteTodo(todo.id))}
                      className="bg-red-500 text-white min-w-[100px] py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className='md:text-xl text-lg max-sm:text-base font-semibold text-center md:my-2 my-1'>Your todos app is empty</p>
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default Home;