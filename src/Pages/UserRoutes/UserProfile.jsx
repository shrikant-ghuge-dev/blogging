import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import { getUser } from '../../Services/UserService'
import userContext from './../../Context/UserContext'
import ViewUserProfile from '../../Components/ViewUserProfile'

function UserProfile() {
    const obj = useContext(userContext)
    const userId = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log(userId)
        getUser(userId.id).then(data => {
            setUser({ ...data })
        }).catch(error => console.log(error))
    }, [])

    const userView = () => {
        return (
            <Row className='m-0'>
                <Col md={{ size: 8, offset: 2 }}>
                    <ViewUserProfile user={user} />
                </Col>
            </Row>
        )
    }
    return (
        <>{user ? userView() : 'Loading user data...'}</>
    )
}

export default UserProfile