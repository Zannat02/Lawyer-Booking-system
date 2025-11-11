import React, { Suspense, useState } from 'react';
import Lawyer from '../Lawyer/Lawyer';


const Lawyers = ({ data }) => {

    // console.log(data)

    const [showAll, setShowAll] = useState(false);

    const visibleLawyers = showAll ? data : data.slice(0, 6);


    return (
        <div>
            <h1 className='text-3xl font-bold text-center pt-15'>Our Best Lawyers</h1>
            <p className='text-center text-gray-400 pt-5'>Our platform connects you with verified, experienced Lawyers across various specialties — all at your convenience. Whether it's a routine <br /> checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.</p>

            <Suspense fallback={<span>Loading...</span>}>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    {
                        visibleLawyers.map(lawyer => <Lawyer key={lawyer.id} lawyer={lawyer}></Lawyer>)
                    }
                </div>

            </Suspense>

            {/* <button className='mt-5 bg-green-700 p-3 rounded-2xl text-white '>Show all Lawyars</button> */}
            {/* Button */}
            <div className='text-center mt-6'>
                <button onClick={() => setShowAll(!showAll)}
                    className='bg-green-700 px-6 py-3 rounded-2xl text-white hover:bg-green-800 transition'>

                    {showAll ? 'Show Less' : 'Show All Lawyers'}
                    
                </button>
            </div>
        </div>
    );
};

export default Lawyers;