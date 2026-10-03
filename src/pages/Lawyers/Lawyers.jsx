import React, { Suspense, useState } from 'react';
import Lawyer from '../Lawyer/Lawyer';

const Lawyers = ({ data }) => {

    const [showAll, setShowAll] = useState(false);
    const visibleLawyers = showAll ? data : data.slice(0, 6);

    return (
        <div className="px-4 sm:px-0">
            <h1 className='text-2xl md:text-3xl font-bold text-center pt-10 md:pt-15'>Our Best Lawyers</h1>
            <p className='text-center text-gray-400 text-sm md:text-base pt-4 md:pt-5 max-w-2xl mx-auto'>Our platform connects you with verified, experienced Lawyers across various specialties — all at your convenience. Whether it's a routine consultation or urgent consultation, book appointments in minutes and receive quality care you can trust.</p>

            <Suspense fallback={<span>Loading...</span>}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mt-8 md:mt-10'>
                    {
                        visibleLawyers.map(lawyer => <Lawyer key={lawyer.id} lawyer={lawyer}></Lawyer>)
                    }
                </div>
            </Suspense>

            <div className='text-center mt-6'>
                <button onClick={() => setShowAll(!showAll)}
                    className='bg-green-700 px-5 md:px-6 py-2.5 md:py-3 rounded-2xl text-white text-sm md:text-base hover:bg-green-800 transition'>
                    {showAll ? 'Show Less' : 'Show All Lawyers'}
                </button>
            </div>
        </div>
    );
};

export default Lawyers;