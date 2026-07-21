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
    <div className='h-screen w-1/2 bg-gradient-to-b from-dark-950 to-dark-900 border-r border-dark-700'>
      <div className='flex flex-col justify-center items-center h-full w-full gap-5'>
        {/* Header */}
        <div className='text-center mb-4'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-crimson-500 to-crimson-400 bg-clip-text text-transparent'>
            Add New Task
          </h1>
          <p className='text-dark-400 text-sm mt-1'>Create and organize your tasks</p>
        </div>

        <form action="" className='flex flex-col justify-center items-center gap-4 outline-none w-[70%]' onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder='Title'
                className='w-full p-3 bg-dark-800 border border-dark-600 rounded-lg outline-none text-gray-200 placeholder-dark-500 focus:border-crimson-600 transition-all duration-300'
                value={taskTitle}
                onChange={(e)=>setTaskTitle(e.target.value)}
              />
              <textarea
                type="text"
                placeholder='Description'
                className='w-full p-3 bg-dark-800 border border-dark-600 rounded-lg outline-none text-gray-200 placeholder-dark-500 focus:border-crimson-600 transition-all duration-300 min-h-[100px] resize-none'
                value={taskDescription}
                onChange={(e)=>setTaskDescription(e.target.value)}
              />
              <button
                type='submit'
                className='w-full p-3 bg-gradient-to-r from-crimson-700 to-crimson-600 text-white rounded-lg hover:cursor-pointer hover:from-crimson-600 hover:to-crimson-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold tracking-wide shadow-lg shadow-crimson-800/30'
              >
                Add Task
              </button>
            </form>
      </div>
    </div>
  )
}

export default Entry