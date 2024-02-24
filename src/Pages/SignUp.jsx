import React from 'react'
// import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { myAxios } from '../Services/Helper';
import { signup } from '../Services/UserService';

function SignUp() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: ''
    });

    const [error, setError] = useState({
        error: {},
        isError: false,
    });

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    const handleChange = (e, property) => {
        setData({ ...data, [property]: e.target.value });
    }

    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: ''
        })
    }

    const submitForm = (event) => {
        event.preventDefault();
        signup(data).then((res) => {
            console.log(res)
            toast.success("User registered successfully!!");
            resetData();
        }).catch((err) => {
            console.log("-----")
            setError({
                error: err,
                isError: true
            })
            console.log(error)
        })
    }
    return (
        <div>
            <Container>
                <Row className='mt-4'>
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card>
                            <CardHeader>
                                <h3>SignUp</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input type='text' id='name' placeholder='Enter name' value={data.name} invalid={error.error?.response?.data?.name ? true : false} onChange={(e) => handleChange(e, 'name')} />
                                        <FormFeedback>{error.error?.response?.data?.name}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input type='email' id='email' placeholder='Enter email' value={data.email} invalid={error.error?.response?.data?.email ? true : false} onChange={(e) => handleChange(e, 'email')} />
                                        <FormFeedback>{error.error?.response?.data?.email}</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input type='password' id='password' placeholder='Enter password' value={data.password} invalid={error.error?.response?.data?.password ? true : false} onChange={(e) => handleChange(e, 'password')} />
                                        <FormFeedback>{error.error?.response?.data?.password}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="about">About</Label>
                                        <Input type='textarea' id='about' placeholder='Enter about' value={data.about} invalid={error.error?.response?.data?.about ? true : false} onChange={(e) => handleChange(e, 'about')} />
                                        <FormFeedback>{error.error?.response?.data?.about}</FormFeedback>
                                    </FormGroup>
                                    <Container className='text-center'>
                                        <Button color='dark'>Register</Button>
                                        <Button color='secondary' type='reset' onClick={resetData} className='ms-2'>Reset</Button>
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

export default SignUp;
