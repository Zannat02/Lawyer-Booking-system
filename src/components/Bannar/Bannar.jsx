import React, { useEffect, useState } from 'react';
import BannarImage from '../../assets/banner-img-1.png'

const Bannar = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0.1), rgba(15, 15, 15, 0.85)),
        url(${BannarImage})`, backgroundSize: 'cover', backgroundPosition: 'center'
        }} className='relative rounded-2xl my-6 mx-3 sm:mx-6 lg:mx-0 min-h-[45vh] sm:min-h-[60vh] lg:h-[80vh] flex items-center overflow-hidden'>

            <div className='pt-6 sm:pt-16 lg:pt-0 px-3 sm:px-8 w-full'>

                <p
                    className={`text-green-300 text-xs sm:text-sm font-semibold tracking-widest uppercase text-center mb-3 transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
                >
                    Trusted Legal Experts in Bangladesh
                </p>

                <h2
                    className={`text-white text-xl md:text-3xl lg:text-5xl text-center font-bold leading-snug transition-all duration-700 ease-out delay-150 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    It avoids subjective claims or
                    <br className="hidden md:block" /> exaggeration that might raise red
                    <br className="hidden md:block" /> flags legally
                </h2>

                <p
                    className={`text-gray-200 text-xs md:text-base text-center pt-3 md:pt-6 max-w-2xl mx-auto transition-all duration-700 ease-out delay-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's a routine consultation or urgent consultation, book appointments in minutes and receive quality care you can trust.
                </p>

                <div
                    className={`flex justify-center gap-3 mt-6 transition-all duration-700 ease-out delay-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    <button className="bg-green-700 hover:bg-green-800 text-white px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition">
                        Find a Lawyer
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white border border-white/40 px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm transition">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Bannar;