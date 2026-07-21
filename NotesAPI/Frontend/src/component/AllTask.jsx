import React from 'react'
import Task from './Task'
import { useEffect,useState } from 'react'
import axios from 'axios'

const AllTask = ({ refreshTrigger, setRefreshTrigger }) => {
  const [AllTasks, setAllTasks]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/getAllTasks").then((res)=>{
      setAllTasks(res.data)
    })
  },[refreshTrigger])
  return (
    <div className='h-screen w-1/2 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950 flex flex-wrap gap-5 p-6 overflow-y-scroll justify-center content-start'>
      {/* Section header */}
      <div className='w-full text-center py-3 mb-2'>
        <h2 className='text-2xl font-bold text-gray-200'>
          Your Tasks
          <span className='ml-2 text-sm font-normal text-dark-400'>({AllTasks.length})</span>
        </h2>
        <div className='h-[2px] w-16 bg-gradient-to-r from-crimson-600 to-crimson-400 mx-auto mt-2 rounded-full'></div>
      </div>

       {AllTasks.map((task)=>(
         <Task key={task._id} task={task} setRefreshTrigger={setRefreshTrigger} />
       ))}

       {AllTasks.length === 0 && (
         <div className='text-dark-500 text-center mt-20'>
           <p className='text-lg'>No tasks yet</p>
           <p className='text-sm mt-1'>Add a task to get started</p>
         </div>
       )}
       
    </div>
  )
}

export default AllTask