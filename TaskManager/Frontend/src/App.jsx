import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import Userprofile from '../components/Userprofile'
import AdminDashboard from '../components/AdminDashboard'
import { useState } from 'react'

const App = () => {
  const [registered, setRegistered] = useState(false);
  const [logged, setLogged] = useState(false);
  const [admin, setAdmin] = useState(false);

  const isRegistered = () => {
    setRegistered(registered => !registered);
  }

  const isLogged = () => {
    setLogged(logged => !logged);
  }

  const isAdmin = () => {
    setAdmin(admin => !admin);
  }


  
  return (
    <>
      {/* Show one at a time — swap the component below to switch */}
      {!registered ? <Register isRegistered={isRegistered}/> : !logged ? <Login isLogged={isLogged} isAdmin={isAdmin} isRegistered={isRegistered}/> : !admin ? <Userprofile isLogged={isLogged}/> : <AdminDashboard isLogged={isLogged} isAdmin={isAdmin}/>}
    </>
  )
}

export default App