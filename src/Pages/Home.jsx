import React from 'react'
import { useEffect } from 'react';
import { Container } from 'reactstrap';
import NewFeed from '../Components/NewFeed';

function Home() {

    return (
        <Container>
            <NewFeed />
        </Container>
    )
}

export default Home;
