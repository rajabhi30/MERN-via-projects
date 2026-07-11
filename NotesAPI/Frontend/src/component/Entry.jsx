import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Entry = ({ setRefreshTrigger }) => {
  const[taskTitle,setTaskTitle]=useState("")
  const[taskDescription,setTaskDescription]=useState("")

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(taskTitle,taskDescription)
    setTaskTitle("")
    setTaskDescription("")

    axios.post("http://localhost:5000/addTasks",{
      title:taskTitle,
      description:taskDescription,
    }).then(()=>{
      setRefreshTrigger(prev => !prev)
    }).catch(err=>{
      console.error("Error adding task:", err)
    })
  }

  return (
    <div className='h-screen w-1/2'>
      <div className='flex flex-col justify-center items-center h-full w-full gap-5'>
        <form action="" className='flex flex-col justify-center items-center gap-4 outline-none ' onSubmit={handleSubmit}>
              <input type="text" placeholder='Title' className='p-2 border border-gray-300 rounded-md outline-none ' value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)} />
              <textarea type="text" placeholder='Description' className='p-2 border border-gray-300 rounded-md outline-none ' value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)} />
              <button type='submit' className='p-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:scale-105 transition-all duration-200'>Add Task</button>
            </form>
      </div>
    </div>
  )
}

export default Entry