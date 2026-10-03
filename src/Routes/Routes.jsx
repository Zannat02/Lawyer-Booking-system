import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import MyBookings from "../pages/My-Bookings/MyBookings";
import LawyerDetails from "../pages/LawyerDetails/LawyerDetails";
import Blogs from "../pages/Blogs/Blogs";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: () => fetch('/LawyersData.json').then(res => res.json()),
        path: '/',
        Component: Home
      },
      {
        path: 'bookings',
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        )
      },
      {
        path: 'LawyerDetails/:id',
        loader: () => fetch('/LawyersData.json').then(res => res.json()),
        Component: LawyerDetails
      },
      {
        path: 'blogs',
        loader: () => fetch('/BlogData.json').then(res => res.json()),
        Component: Blogs
      },
      {
        path: 'contact',
        Component: ErrorPage
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }

    ]


  },
  {
    path: '*', // any undefined route
    Component: ErrorPage
  }

]);