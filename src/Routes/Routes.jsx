import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import MyBookings from "../pages/My-Bookings/MyBookings";
import LawyerDetails from "../pages/LawyerDetails/LawyerDetails";
import Blogs from "../pages/Blogs/Blogs";




export  const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            index: true,
            loader:()=>fetch('LawyersData.json'),
            path:'/',
            Component:Home
        },
        {
          path:'/bookings',
          Component:MyBookings
        },
        {
          path: '/LawyerDetails/:id',
          loader:()=>fetch('LawyersData.json'),
          Component:LawyerDetails
        },
        {
          path:'/blogs',
          loader:()=>fetch('BlogData.json'),
          Component:Blogs
        },
         {
          path:'/contact',
          Component:ErrorPage
        }
        
    ]
    

  },
  {
  path: '*', // any undefined route
  Component: ErrorPage
}
 
]);