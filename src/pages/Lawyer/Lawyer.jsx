import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { PiSealCheckFill } from "react-icons/pi";

const Lawyer = ({ lawyer }) => {
  const { name, image, experience, speciality, licenseNumber, id, available } =
    lawyer;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleViewDetails = () => {
    setLoading(true);

    setTimeout(() => {
      navigate(`/LawyerDetails/${id}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-[200px]">

      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      )}

      <div className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        {/* Image with overlay badge */}
        <div className="relative w-full sm:w-36 h-40 sm:h-auto shrink-0">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={name}
          />
          <div className="absolute top-2 left-2">
            {available && (
              <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-semibold text-green-700 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                Available
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-5 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-1">
              {name}
              <PiSealCheckFill className="text-sky-500 shrink-0" size={16} title="Verified" />
            </h2>
          </div>

          <p className="text-green-700 text-xs md:text-sm font-medium mt-0.5">{speciality}</p>

          <div className="flex items-center gap-1 text-gray-400 text-xs mt-2">
            <HiOutlineBriefcase size={14} />
            <span>{experience}+ years experience</span>
          </div>

          <p className="text-gray-400 text-xs mt-1 mb-1">License No: {licenseNumber}</p>

          <button
            onClick={handleViewDetails}
            disabled={loading}
            className="mt-auto pt-4 flex items-center justify-center gap-2 bg-gray-900 group-hover:bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors duration-300"
          >
            View Details
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lawyer;