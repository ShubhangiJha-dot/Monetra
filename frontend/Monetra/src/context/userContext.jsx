import React, {createContext, useState} from 'react'

export const UserContext=createContext()

const UserProvider = ({children}) => {
// const [user, setUser] = useState(() => {
//   const storedUser = localStorage.getItem("user")
//   return storedUser ? JSON.parse(storedUser) : null
// })
    const [user,setUser]=useState(null)

    //fxn to update user data
    const updateUser=(userData)=>{
        setUser(userData)
    }
    //fxn to clear userdata like on logout
    const clearUser=()=>{
        setUser(null)
    }

  return (
    <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
        }}
    >
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider