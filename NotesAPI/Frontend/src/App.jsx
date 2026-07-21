import React, { useState } from 'react'
import Entry from './component/Entry'
import AllTask from './component/AllTask'
import Task from './component/Task'

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  return (
    <div className='h-screen w-full flex bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800'>
      <Entry setRefreshTrigger={setRefreshTrigger} />
      <AllTask refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />
      {/* <Task/> */}
    </div>
  )
}

export default App