import React, { useState } from 'react';
import { useNavigate } from 'react-router';

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

      <div className="card card-side bg-base-100 border border-gray-400">
        <figure className="m-3">
          <img
            className="w-40 h-[166px] rounded-2xl object-cover"
            src={image}
            alt={name}
          />
        </figure>

        <div className="card-body">
          <div>
            <button className="m-2 bg-green-100 rounded-2xl px-3 text-green-600 text-sm">
              {available ? 'Available' : 'Not Available'}
            </button>
            <button className="m-2 bg-sky-100 rounded-2xl text-sky-400 px-3 text-sm">
              {experience}+ years experience
            </button>
          </div>

          <h2 className="card-title">{name}</h2>
          <p className="text-gray-400 text-sm">{speciality}</p>
          <p className="text-gray-400 text-sm">License No: {licenseNumber}</p>

          <button
            onClick={handleViewDetails}
            className="btn rounded-2xl border-sky-300 text-sky-400 w-full hover:bg-blue-600 hover:text-white"
            disabled={loading}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lawyer;




