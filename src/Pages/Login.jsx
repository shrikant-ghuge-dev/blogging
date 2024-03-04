import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { doLogin } from '../Auth';
import { signin } from '../Services/UserService';


function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const resetForm = () => {
        setData({
            username: '',
            password: ''
        })
    }

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value })
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (data.username.trim() === "" || data.password.trim() === "") {
            toast.error("Username or Password is required!");
            return
        }

        signin(data).then(res => {
            doLogin(res, () => {
                navigate("/user/dashboard");
                toast.success("User login successfully!!");
                resetForm();
            });
        }).catch(err => {
            if (err.response.status === 400 || err.response.status === 404) {
                toast.error(res.response.data.message);
            } else {
                toast.error("Something went wrong!!");
            }
        })
    }

    return (
        <div>
            <Container>
                <Row className='mt-4'>
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card>
                            <CardHeader>
                                <h3>Login</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitHandler}>

                                    <FormGroup>
                                        <Label for="username">Enter username</Label>
                                        <Input type='username' id='username' placeholder='Enter username' onChange={(e) => handleChange(e, 'username')} value={data.username} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input type='password' id='password' placeholder='Enter password' onChange={(e) => handleChange(e, 'password')} value={data.password} />
                                    </FormGroup>
                                    <Container className='text-center'>
                                        <Button color='dark'>Login</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;