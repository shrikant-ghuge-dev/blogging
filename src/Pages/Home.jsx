import React from 'react'
import { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import CategorySideMenu from '../Components/CategorySideMenu';
import NewFeed from '../Components/NewFeed';

function Home() {

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <CategorySideMenu />
                </Col>
                <Col md={9}>
                    <NewFeed />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
