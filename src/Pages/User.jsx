import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { isLoggedIn } from '../Auth';

function User() {
    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />
}

export default User