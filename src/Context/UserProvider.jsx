import React, { useState } from 'react'
import userContext from './UserContext'

function UserProvider({ children }) {
    const [user, setUser] = useState({
        name: "Shrikant"
    })
    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider