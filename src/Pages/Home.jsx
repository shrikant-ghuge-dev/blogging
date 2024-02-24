import React from 'react'
import { Outlet } from 'react-router-dom';
import CustomNavbar from '../Components/CustomNavbar';

function Home() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Home;
