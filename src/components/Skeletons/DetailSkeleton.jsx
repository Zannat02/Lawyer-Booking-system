import React from 'react';

const DetailSkeleton = () => (
    <div className="px-4 sm:px-0 animate-pulse">
        <div className="bg-gray-200 h-28 sm:h-32 rounded-2xl mb-5"></div>

        <div className="flex flex-col sm:flex-row gap-6 border border-gray-200 sm:m-6 md:m-10 p-5 md:p-10 rounded-2xl">
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-xl bg-gray-200 mx-auto sm:mx-0 shrink-0"></div>
            <div className="flex-1 space-y-3 flex flex-col items-center sm:items-start">
                <div className="h-5 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-40"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-48"></div>
                <div className="h-3 bg-gray-200 rounded w-28"></div>
            </div>
        </div>

        <div className="mt-8 border border-gray-200 rounded-2xl p-4 md:p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-56 mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-12 bg-gray-200 rounded-2xl w-full"></div>
        </div>
    </div>
);

export default DetailSkeleton;