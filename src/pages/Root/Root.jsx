import React, { useEffect } from 'react';
import NavBar from '../../components/Header/NavBar';
import { Outlet, useLocation, useNavigation } from 'react-router';
import Footer from '../../components/Footer/Footer';
import ChatWidget from '../../components/ChatWidget/ChatWidget';
import CardSkeleton from '../../components/Skeletons/CardSkeleton';
import DetailSkeleton from '../../components/Skeletons/DetailSkeleton';

const Root = () => {

    const location = useLocation();
    const navigation = useNavigation();

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

    const isNavigating = navigation.state === 'loading';
    const targetPath = navigation.location?.pathname || '';

    let skeleton = null;
    if (isNavigating) {
        if (targetPath.startsWith('/LawyerDetails')) {
            skeleton = <DetailSkeleton />;
        } else if (targetPath === '/') {
            skeleton = <CardSkeleton />;
        }
    }

    return (
        <div >
            <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6'>
                <NavBar></NavBar>

                {skeleton ? skeleton : <Outlet></Outlet>}
            </div>


            <Footer></Footer>

            <ChatWidget></ChatWidget>

        </div>


    );
};

export default Root;