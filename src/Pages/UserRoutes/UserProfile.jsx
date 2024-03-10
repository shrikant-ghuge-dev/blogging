import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import { getUser } from '../../Services/UserService'
import userContext from './../../Context/UserContext'

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
                    <Card className='mt-5 shadow'>
                        <CardBody>
                            <h3 className='text-uppercase'>User Details</h3>
                            <Container className='text-center'>
                                <img style={{ maxWidth: '150px', maxHieght: '150px' }} src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg" alt="" className='img-fluid rounded-circle' />
                            </Container>
                            <Table responsive striped hover bordered={true} className='mt-5 text-center'>
                                <tbody>
                                    <tr>
                                        <td className='text-uppercase'>
                                            test
                                        </td>
                                        <td>
                                            test
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-uppercase'>
                                            Username
                                        </td>
                                        <td>
                                            {user?.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-uppercase'>
                                            Email
                                        </td>
                                        <td>
                                            {user?.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-uppercase'>
                                            About
                                        </td>
                                        <td>
                                            {user?.about}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-uppercase'>
                                            Role
                                        </td>
                                        <td>
                                            {user?.roles?.map(role => (
                                                <div key={role.id}>{role.name}</div>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
    return (
        <>{user ? userView() : 'Loading user data...'}</>
    )
}

export default UserProfile