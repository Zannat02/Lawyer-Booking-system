import React from 'react';
import { Link, NavLink } from 'react-router';
import footerImage from '../../assets/logo-footer.png'

const Footer = () => {

  const links = <>

    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive
          ? "m-1 md:m-2 px-3 md:px-4 py-2 text-sm md:text-base font-semibold border-b-2 border-white text-white rounded-md"
          : "m-1 md:m-2 px-3 md:px-4 py-2 text-sm md:text-base text-white hover:bg-gray-200  hover:text-gray-600   rounded-md transition-all duration-300"
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/bookings"
      className={({ isActive }) =>
        isActive
          ? "m-1 md:m-2 px-3 md:px-4 py-2 text-sm md:text-base font-semibold border-b-2 border-white text-white rounded-md"
          : "m-1 md:m-2 px-3 md:px-4 py-2 text-sm md:text-base text-white hover:bg-gray-200  hover:text-gray-600 rounded-md transition-all duration-300"
      }
    >
      My-Bookings
    </NavLink>

    <NavLink
      to="/blogs"
      className={({ isActive }) =>
        isActive
          ? "m-1 md:m-2 px-3 md:px-4 py-2 text-sm md:text-base font-semibold border-b-2 border-white text-white rounded-md"
          : "m-1 md:m-2 px-3 md:px-4 py-2 text-sm md:text-base text-white hover:bg-gray-200  hover:text-gray-600 rounded-md transition-all duration-300"
      }
    >
      Blogs
    </NavLink>

    <NavLink
      to="/contact"
      className={({ isActive }) =>
        isActive
          ? "m-1 md:m-2 px-3 md:px-4 py-2 text-sm md:text-base font-semibold border-b-2 border-white text-white rounded-md"
          : "m-1 md:m-2 px-3 md:px-4 py-2 text-sm md:text-base text-white hover:bg-gray-200  hover:text-gray-600 rounded-md transition-all duration-300"
      }
    >
      Contact Us
    </NavLink>

  </>

  return (

    <footer className="text-white bg-black p-6 md:p-10 mt-10">
     <div className="flex flex-col lg:items-center gap-3 lg:gap-2 max-w-6xl mx-auto">

      <div className="flex items-center self-start lg:self-center">
        <img className="w-7 md:w-9 m-1" src={footerImage} alt="" />
        <a className="text-lg md:text-xl font-bold text-white">Law.BD</a>
      </div>

      <nav className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-center gap-1 lg:gap-4 w-full lg:w-auto">
        {links}
      </nav>

      <div className="border-t border-dashed border-gray-700 my-4 md:my-6 w-full"></div>

      <nav className="w-full flex justify-center">
        <div className="grid grid-flow-col gap-3 md:gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current hover:text-blue-400 transition md:w-6 md:h-6">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>

          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current hover:text-red-500 transition md:w-6 md:h-6">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>

          <a href="https://www.facebook.com/share/17mCWVCb6G/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current hover:text-blue-600 transition md:w-6 md:h-6">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>

          <a href="https://www.linkedin.com/in/zannatul-ferdous-297259215/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current hover:text-blue-500 transition md:w-6 md:h-6">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.061-1.865-3.061-1.867 0-2.153 1.459-2.153 2.967v5.698h-3v-10h2.881v1.367h.041c.401-.76 1.379-1.561 2.838-1.561 3.036 0 3.594 2.001 3.594 4.601v5.593z" />
            </svg>
          </a>
        </div>
      </nav>
     </div>
    </footer>

  );
};

export default Footer;