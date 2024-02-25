import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import Home from './Pages/Home.jsx';
import Layout from './Components/Layout.jsx';
import { ToastContainer } from 'react-toastify';
import User from './Pages/User.jsx';
import UserProfile from './Pages/UserRoutes/UserProfile.jsx';
import UserDashboard from './Pages/UserRoutes/UserDashboard.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: 'user',
        element: <User />,
        children: [
          {
            path: 'profile',
            element: <UserProfile />
          },
          {
            path: 'dashboard',
            element: <UserDashboard />
          }
        ]
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
