import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import NavbarImage from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';

const NavBar = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully!");
                navigate('/');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const links = <>
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
                    ? "m-2 px-4 py-2 font-semibold border-b-2 border-black rounded-md"
                    : "m-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300"
            }
        >
            My-Bookings
        </NavLink>

        <NavLink
            to="/blogs"
            className={({ isActive }) =>
                isActive
                    ? "m-2 px-4 py-2 font-semibold border-b-2 border-black rounded-md"
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
        <div className="navbar bg-base-100 px-2 sm:px-3 md:px-6">
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
                <img className='w-7 md:w-9 m-1' src={NavbarImage} alt="" />
                <a className="text-lg md:text-xl font-bold">Law.BD</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-1.5 md:gap-2">
                {user ? (
                    <>
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                title={user.displayName || user.email}
                                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-gray-300"
                            />
                        ) : (
                            <div
                                title={user.displayName || user.email}
                                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-green-900 text-white flex items-center justify-center text-xs md:text-sm font-bold"
                            >
                                {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="btn btn-sm md:btn-md bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs md:text-sm"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="btn btn-sm md:btn-md btn-ghost rounded-2xl text-xs md:text-sm"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="btn btn-sm md:btn-md bg-green-900 text-white rounded-2xl text-xs md:text-sm"
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;