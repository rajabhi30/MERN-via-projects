import React from 'react'
import {RiCloseCircleLine} from "@remixicon/react"
import axios from 'axios'

const Task = ({task, setRefreshTrigger}) => {
    const deleteone=()=>{
        axios.delete(`http://localhost:5000/delete/${task._id}`)
        .then(() => {
            setRefreshTrigger(prev => !prev)
        })
        .catch(err => {
            console.error("Error deleting task:", err)
        })
    }

    const isComplete=()=>{
        axios.put(`http://localhost:5000/toggle/${task._id}`)
        .then(() => {
            setRefreshTrigger(prev => !prev)
        })
        .catch(err => {
            console.error("Error toggling task:", err)
        })
    }
  return (
    <div className='h-fit w-[45%] bg-gradient-to-br from-dark-800 to-dark-700 flex flex-col gap-2 border border-dark-600 p-5 rounded-xl shadow-lg shadow-black/30 hover:border-crimson-800 hover:shadow-crimson-800/10 transition-all duration-300'>
      <button
        onClick={deleteone}
        className='self-end hover:cursor-pointer hover:scale-110 hover:text-crimson-400 transition-all duration-200 text-crimson-600'
      >
        <RiCloseCircleLine />
      </button>
      <h1 className={`font-bold text-md ${task.completed ? 'line-through text-dark-500' : 'text-gray-100'}`}>
        {task.title}
      </h1>
      <p className={`text-xs ${task.completed ? 'text-dark-500 line-through' : 'text-dark-300'}`}>
        {task.description}
      </p>
      <button
        onClick={isComplete}
        className={`rounded-lg p-2 hover:cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-white font-medium text-sm tracking-wide ${
          task.completed
            ? 'bg-gradient-to-r from-amber-600 to-amber-500 shadow-amber-700/20 shadow-md'
            : 'bg-gradient-to-r from-crimson-700 to-crimson-600 shadow-crimson-800/20 shadow-md'
        }`}
      >
        {task.completed ? 'Undo' : 'Done'}
      </button>
    </div>
  )
}

export default Task