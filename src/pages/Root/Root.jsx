import React, { useEffect } from 'react';
import NavBar from '../../components/Header/NavBar';
import { Outlet, useLocation,  } from 'react-router';
import Footer from '../../components/Footer/Footer';

const Root = () => {

    const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    const title =
      path === ''
        ? 'Home'
        : path
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    document.title = `${title} | Lawyer Booking`; 
  }, [location]);

   
    return (
        <div >
           <div className='max-w-7xl mx-auto'>
             <NavBar></NavBar>
              
            <Outlet></Outlet>
           </div>
          
           
               <Footer></Footer>
           
        </div>

      
    );
};

export default Root;