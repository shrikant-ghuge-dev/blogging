import React from 'react'
import { useContext } from 'react'
import userContext from './../../Context/UserContext'

function UserProfile() {
    const context = useContext(userContext)
    return (
        <h1>{context.name}</h1>
        // <userContext.Consumer>
        //     {
        //         (user) => {
        //             console.log(user)
        //         }
        //     }
        // </userContext.Consumer>
    )
}

export default UserProfile