import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../modules/todoSlice/todosSlice.js';

const AddTodo = () => {
  // Get dispatch function to send an action to slice
  const dispatch = useDispatch();
  // State to store new todo
  const [title, setTitle] = useState('');

  // Handle on add new todo
  const handleAddTodo = (e) => {
    e.preventDefault();

    if(title.trim()) {
      dispatch(addTodo(title));
      setTitle('');
    }
  }
  return (
    <div className='flex justify-center items-center'>
      <form className='flex space-x-4' onSubmit={handleAddTodo}>
        <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-[250px] max-sm:max-w-[220px] py-1.5 px-3 border border-gray-300 rounded-md outline-0 focus:outline-1 focus:outline-pink-500 placeholder:text-[15px] md:w-[300px]' 
        placeholder='Your todo goes here...'/>
        <button 
        type='submit' 
        disabled={!title.trim()} 
        className='text-nowrap cursor-pointer bg-cyan-500 text-white font-semibold px-3 rounded-sm transition ease-in-out duration-200 hover:bg-cyan-600'>Add New Todo</button>
      </form>
    </div>
  )
}

export default AddTodo