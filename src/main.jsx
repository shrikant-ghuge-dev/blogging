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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "signup",
      element: <SignUp />,
    }]
  }]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
