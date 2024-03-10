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
import PostDetails from './Pages/UserRoutes/PostDetails.jsx';
import UserProvider from './Context/UserProvider.jsx';
import Category from './Pages/Category.jsx';
import UpdateBlog from './Pages/UpdateBlog.jsx';

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
        path: "post/:postId",
        element: <PostDetails />,
      },
      {
        path: "category/:catId",
        element: <Category />,
      },
      {
        path: 'user',
        element: <User />,
        children: [
          {
            path: 'profile/:id',
            element: <UserProfile />
          },
          {
            path: 'add-blog',
            element: <UserDashboard />
          },
          {
            path: 'update-blog/:blogId',
            element: <UpdateBlog />
          }
        ]
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
