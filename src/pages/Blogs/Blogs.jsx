import React from 'react';
import { useLoaderData } from 'react-router';

const Blogs = () => {


    const data = useLoaderData();
    console.log(data)

    




    return (
        <div>

            <h1>{ }</h1>
            <h1 className='text-3xl text-center font-bold mt-5 '>Blogs</h1>
            <p className='text-gray-400 text-center mt-5 '>Let's explore some basic concept that will make you a good developer</p>

            <div className="space-y-5 mt-8">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-300 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                    >
                        <h2 className="text-lg font-semibold mb-2  ">
                            Q: {item.question}
                        </h2>
                        <div className='border border-dashed border-gray-300'></div>
                        <p className="mt-2 text-gray-700 leading-relaxed mb-2">
                            {item.answer}
                        </p>
                         <div className='border border-dashed border-gray-300'></div>
                        <p className="text-sm text-gray-400 mt-2">
                            🗓️ Added on: {item.dateAdded}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;