import React from 'react';

const SkeletonCard = () => (
    <div className="flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
        <div className="w-full sm:w-36 h-40 sm:h-auto bg-gray-200 shrink-0"></div>
        <div className="flex-1 p-4 sm:p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-9 bg-gray-200 rounded-xl w-full mt-4"></div>
        </div>
    </div>
);

const CardSkeleton = ({ count = 6 }) => (
    <div className="px-4 sm:px-0">
        <div className="h-7 bg-gray-200 rounded w-48 mx-auto mt-10 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 max-w-md mx-auto mt-4 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 md:mt-10">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    </div>
);

export default CardSkeleton;