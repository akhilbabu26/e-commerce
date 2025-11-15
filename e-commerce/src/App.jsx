import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './Authentication/Registration/Registration'
import Login from './Authentication/Login/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App