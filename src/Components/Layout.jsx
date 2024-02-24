import React from 'react'
import { Outlet } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';

function Layout({ children }) {
    return (
        <>
            <CustomNavbar />
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}


export default Layout;