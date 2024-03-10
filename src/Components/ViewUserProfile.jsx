import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../Auth'

const ViewUserProfile = ({ user }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [login, setLogin] = useState(null)

    useEffect(() => {
        setCurrentUser(getCurrentUserDetails())
        setLogin(isLoggedIn())
    }, [])
    return (
        <Card className='mt-5 shadow'>
            <CardBody>
                <h3 className='text-uppercase'>User Details</h3>
                <Container className='text-center'>
                    <img style={{ maxWidth: '150px', maxHieght: '150px' }} src={user.image ? user.image : "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"} alt="" className='img-fluid rounded-circle' />
                </Container>
                <Table responsive striped hover bordered={true} className='mt-5 text-center'>
                    <tbody>
                        <tr>
                            <td className='text-uppercase'>
                                BloggingId
                            </td>
                            <td>
                                {user.id}
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
                {
                    currentUser ? (currentUser?.id == user?.id) ? (
                        <CardFooter className='text-center'>
                            <Button color='warning' className='text-white'>Update Profile</Button>
                        </CardFooter>) : ''
                        : ''
                }
            </CardBody>
        </Card>
    )
}

export default ViewUserProfile