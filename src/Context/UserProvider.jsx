import React, { useState } from 'react'
import { useEffect } from 'react'
import { getCurrentUserDetails, isLoggedIn } from '../Auth'
import userContext from './UserContext'

function UserProvider({ children }) {
    const [user, setUser] = useState({
        data: {},
        isLogin: false
    })

    useEffect(() => {
        setUser({
            data: getCurrentUserDetails(),
            isLogin: isLoggedIn()
        })
    }, [])

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider