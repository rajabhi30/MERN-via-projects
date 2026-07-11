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
    <div className='h-screen w-1/2 bg-blue-500 flex flex-wrap gap-5 p-5 overflow-y-scroll justify-center'>
     
       {AllTasks.map((task)=>(
         <Task key={task._id} task={task} setRefreshTrigger={setRefreshTrigger} />
       ))}
       
    </div>
  )
}

export default AllTask