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
    <div className='h-fit w-[25%] bg-white flex flex-col gap-2 border p-5 rounded-md'  >
    <button onClick={deleteone} className='align-top relative left-25 hover:cursor-pointer hover:scale-110 transition-all duration-200 text-red-800' ><RiCloseCircleLine /></button>
     <h1 className={`font-bold text-md ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h1>
     <p className={`text-xs ${task.completed ? 'text-gray-300 line-through' : 'text-gray-500'}`}>{task.description}</p>
     <button onClick={isComplete} className={`rounded-md p-1 hover:cursor-pointer hover:scale-110 transition-all duration-200 text-white ${task.completed ? 'bg-amber-500' : 'bg-blue-500'}`}>
       {task.completed ? 'Undo' : 'Done'}
     </button>
    
    </div>
  )
}

export default Task