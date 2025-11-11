import React from 'react';
import { Link, NavLink } from 'react-router';

import NavbarImage from '../../assets/logo.png'

const NavBar = () => {

    const links = <>
{/* 
        <Link to='/'> <li className='m-2'>Home</li></Link>
        <Link> <li className='m-2'>My-Bookings</li></Link>
        <Link> <li className='m-2'>Blogs</li></Link>
        <Link> <li className='m-2'>Contact Us</li></Link> */}
        <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "m-2 px-4 py-2 font-semibold border-b-2 border-black rounded-md"
      : "m-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/bookings"
        className={({ isActive }) =>
          isActive
            ?   "m-2 px-4 py-2 font-semibold border-b-2 border-black rounded-md"
      : "m-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300"
        }
      >
        My-Bookings
      </NavLink>

      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive
            ?  "m-2 px-4 py-2 font-semibold border-b-2 border-black rounded-md"
      : "m-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300"
        }
      >
        Blogs
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "m-2 px-4 py-2 font-semibold border-b-2 border-black rounded-md"
      : "m-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300"
        }
      >
        Contact Us
      </NavLink>
    </>


    return (
        <div className="navbar bg-base-100 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img className='w-9 m-1' src={NavbarImage} alt="" />
                <a className=" text-xl font-bold">Law.BD</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn bg-green-900 text-white rounded-2xl">Contact Now</a>
            </div>
        </div>
    );
};

export default NavBar;