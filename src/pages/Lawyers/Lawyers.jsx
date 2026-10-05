import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import Lawyer from '../Lawyer/Lawyer';
import { CiSearch } from "react-icons/ci";

const Lawyers = ({ data }) => {

    const [showAll, setShowAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [reviews, setReviews] = useState([]);

    // Ekta-i listener: shob review ekbar ane
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'reviews'),
            (snapshot) => {
                setReviews(snapshot.docs.map(d => d.data()));
            },
            (error) => {
                console.error('Reviews load error:', error);
            }
        );
        return () => unsubscribe();
    }, []);

    // lawyerId onujayi average + count
    const ratingMap = useMemo(() => {
        const map = {};
        reviews.forEach(({ lawyerId, rating }) => {
            if (!map[lawyerId]) map[lawyerId] = { sum: 0, count: 0 };
            map[lawyerId].sum += rating;
            map[lawyerId].count += 1;
        });

        const result = {};
        Object.keys(map).forEach((id) => {
            result[id] = {
                average: (map[id].sum / map[id].count).toFixed(1),
                count: map[id].count,
            };
        });
        return result;
    }, [reviews]);

    const specialities = useMemo(() => {
        const unique = [...new Set(data.map(l => l.speciality))];
        return ['All', ...unique];
    }, [data]);

    const filteredLawyers = useMemo(() => {
        let result = [...data];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(l =>
                l.name.toLowerCase().includes(term) ||
                l.speciality.toLowerCase().includes(term)
            );
        }

        if (selectedSpeciality !== 'All') {
            result = result.filter(l => l.speciality === selectedSpeciality);
        }

        if (sortBy === 'fee-low') {
            result.sort((a, b) => a.consultationFee - b.consultationFee);
        } else if (sortBy === 'fee-high') {
            result.sort((a, b) => b.consultationFee - a.consultationFee);
        } else if (sortBy === 'experience') {
            result.sort((a, b) => b.experience - a.experience);
        }

        return result;
    }, [data, searchTerm, selectedSpeciality, sortBy]);

    const visibleLawyers = showAll ? filteredLawyers : filteredLawyers.slice(0, 6);

    return (
        <div className="px-4 sm:px-0">
            <h1 className='text-2xl md:text-3xl font-bold text-center pt-10 md:pt-15'>Our Best Lawyers</h1>
            <p className='text-center text-gray-400 text-sm md:text-base pt-4 md:pt-5 max-w-2xl mx-auto'>Our platform connects you with verified, experienced Lawyers across various specialties — all at your convenience. Whether it's a routine consultation or urgent consultation, book appointments in minutes and receive quality care you can trust.</p>

            {/* Search + Filter + Sort */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto">
                <div className="relative flex-1">
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name or speciality..."
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700"
                    />
                </div>

                <select
                    value={selectedSpeciality}
                    onChange={(e) => setSelectedSpeciality(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700 sm:w-48"
                >
                    {specialities.map(sp => (
                        <option key={sp} value={sp}>{sp}</option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700 sm:w-52"
                >
                    <option value="default">Sort: Default</option>
                    <option value="fee-low">Fee: Low to High</option>
                    <option value="fee-high">Fee: High to Low</option>
                    <option value="experience">Experience: High to Low</option>
                </select>
            </div>

            {filteredLawyers.length === 0 ? (
                <p className="text-center text-gray-400 mt-10">No lawyers found matching your search.</p>
            ) : (
                <Suspense fallback={<span>Loading...</span>}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 md:mt-10'>
                        {
                            visibleLawyers.map(lawyer => (
                                <Lawyer
                                    key={lawyer.id}
                                    lawyer={lawyer}
                                    ratingInfo={ratingMap[lawyer.id]}
                                ></Lawyer>
                            ))
                        }
                    </div>
                </Suspense>
            )}

            {filteredLawyers.length > 6 && (
                <div className='text-center mt-6'>
                    <button onClick={() => setShowAll(!showAll)}
                        className='bg-green-700 px-5 md:px-6 py-2.5 md:py-3 rounded-2xl text-white text-sm md:text-base hover:bg-green-800 transition'>
                        {showAll ? 'Show Less' : 'Show All Lawyers'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Lawyers;