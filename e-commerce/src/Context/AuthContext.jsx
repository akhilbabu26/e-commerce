import React, { createContext, useEffect, useState } from 'react'
import { api } from '../Api/Api'

export const AuthContext = createContext()

function AuthProvider({children}) {

   const [currentUser, setCurrentUser] = useState(()=>{
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser):null
   })
   
    const [allUsers, setAllUsers] = useState([])
    useEffect(()=>{
      const fetchAllUser = async ()=>{
        try{
          const response = await api.get("/users")
          setAllUsers(response.data)
        }
        catch(err){alert(err)}
      }
      fetchAllUser()
    },[])

    

   
  return (
 
    <AuthContext.Provider value={{currentUser, setCurrentUser, allUsers, setAllUsers}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider