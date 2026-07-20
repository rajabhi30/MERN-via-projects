import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import Userprofile from '../components/Userprofile'
import AdminDashboard from '../components/AdminDashboard'

const App = () => {
  return (
    <>
      {/* Show one at a time — swap the component below to switch */}
      {/* <Register /> */}
      <Login />
      {/* <Userprofile /> */}
      {/* <AdminDashboard /> */}
    </>
  )
}

export default App