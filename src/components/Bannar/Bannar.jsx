import React from 'react';
import BannarImage from '../../assets/banner-img-1.png'

const Bannar = () => {
    return (
        <div style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0), rgba(15, 15, 15, 1)),
        url(${BannarImage})`, backgroundSize: 'cover', backgroundPosition: 'center'
        }} className='rounded-2xl my-6 mx-3 sm:mx-6 lg:mx-0 min-h-[40vh] sm:min-h-[55vh] lg:h-[80vh] flex items-center'>

            <div className='pt-6 sm:pt-16 lg:pt-40 px-3 sm:px-8 w-full'>
                <h2 className='text-white text-xl md:text-3xl lg:text-5xl text-center font-bold leading-snug'>
                    It avoids subjective claims or
                    <br className="hidden md:block" /> exaggeration that might raise red
                    <br className="hidden md:block" /> flags legally
                </h2>
                <p className='text-white text-xs md:text-base text-center pt-3 md:pt-6 max-w-2xl mx-auto'>
                    Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's a routine consultation or urgent consultation, book appointments in minutes and receive quality care you can trust.
                </p>
            </div>
        </div>
    );
};

export default Bannar;