import React from 'react';


import successImage from '../../assets/success-doctor.png';
import successImage2 from '../../assets/success-patients.png';
import  successImage3 from '../../assets/success-review.png';
import successImage4 from '../../assets/success-staffs.png'
import CountUp from 'react-countup';

const LawService = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10'>We Provide Best Law Services </h1>

            <p className='text-gray-400 text-center mt-3'>Our platform connects you with verified, experienced Lawyers across various specialities — all at your convenience. </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 px-5 md:px-20">

                {/* Card 1 */}
                <div className=" max-w-sm  border border-gray-300 rounded-2xl bg-gray-200 ">
                    <img
                        src={successImage}
                        alt="Family Law"
                        className="p-5"
                    />
                    <div className="p-5 ">
                        <h1 className="text-2xl font-bold text-gray-800"> 

                            <CountUp end={199} duration={5} />+

                            </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                           Total Lawyer
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="max-w-sm  border rounded-2xl border-gray-300 bg-gray-200">
                    <img
                        src={successImage3}
                        alt="Criminal Law"
                        className="p-5"
                    />
                    <div className="p-5 ">
                        <h1 className="text-2xl font-bold text-gray-800"> <CountUp end={467} duration={5} />+</h1>
                        <p className="text-gray-500 mt-2 text-sm">
                           Total Reviews
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="max-w-sm  border border-gray-300 bg-gray-200 rounded-2xl ">
                    <img
                        src={successImage2}
                        alt="Corporate Law"
                        className="p-5"
                    />
                    <div className="p-5 ">
                        <h1 className="text-2xl font-bold text-gray-800"><CountUp end={1900} duration={5} />+</h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Cases Initiated
                        </p>
                    </div>
                </div>
                {/* card 4 */}
                <div className="max-w-sm border border-gray-300 bg-gray-200 rounded-2xl ">
                    <img
                        src={successImage4}
                        alt="Corporate Law"
                        className="p-5"
                    />
                    <div className="p-5 ">
                        <h1 className="text-2xl font-bold text-gray-800"> <CountUp end={300} duration={5} />+</h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Total Stuffs
                        </p>
                    </div>
                </div>

            </div>






        </div>
    );
};

export default LawService;