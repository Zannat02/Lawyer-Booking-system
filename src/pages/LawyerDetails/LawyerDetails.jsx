import React from 'react';
import { useLoaderData,  useNavigate,  useParams } from 'react-router';
import { CiWarning } from "react-icons/ci";

import { toast } from "react-toastify";

const LawyerDetails = () => {

  const { id } = useParams();

  const data = useLoaderData();

  const navigate = useNavigate();

  const singleLawyer = data.find(lawyer => lawyer.id === parseInt(id));

  //  console.log(data,id)

  //  console.log(singleLawyer)

  const handleBookAppointment = () => {
  const appointment = {
    name,
    speciality,
    consultationFee,
    id: singleLawyer.id,
  };

  
  const existing = JSON.parse(localStorage.getItem("appointments")) || [];

  
  const alreadyBooked = existing.find(item => item.id === appointment.id);
  if (alreadyBooked) {
    toast.warning("Already booked this lawyer!");
    return;
  }


  existing.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(existing));

  toast.success("Appointment booked successfully!");
  navigate("/bookings");
};

const { name, experience, licenseNumber, availability, consultationFee, speciality, image, available } = singleLawyer;


  if (!singleLawyer) {
    return <p className="text-center text-red-500 mt-10">Lawyer not found!</p>;
  }




  return (
    <div >
      <div className='bg-slate-200 p-15 rounded-2xl mb-5'>
        <h1 className="text-3xl font-bold text-center mb-3">Lawyer’s Profile Details</h1>
        <p className='text-gray-500 text-center w-2/3 mx-auto'>Meet our experienced and verified lawyers who are dedicated to providing trusted legal support and expert advice. Each professional is committed to ensuring justice, confidentiality, and the best outcome for every client they serve..</p>
      </div>


      <div className="flex gap-6 border border-gray-300 m-10 p-10 rounded-2xl">
        <img
          src={image}
          alt={name}
          className="w-48 h-48 rounded-xl object-cover border"
        />
        <div className='flex flex-col justify-center gap-2'>
          <p className="bg-sky-100 rounded-2xl text-sky-400 text-center text-sm w-2/3"> {experience}+ years experience</p>
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className='flex gap-5'>
            <p className="text-gray-500 text-sm">{speciality}</p>

            <p className="text-gray-600 text-sm">License No: {licenseNumber}</p>
          </div>

          
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">Availability:</span>
            {availability && availability.length > 0 ? (
              availability.map((day, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-300 px-3 py-1 rounded-full text-sm"
                >
                  {day}
                </span>
              ))
            ) : (
              <span className="text-gray-400 ml-2">Not specified</span>
            )}
          </div>



          <p className=" mt-2 text-sm">Consultation Fee: <span className='text-green-800 font-bold'>Taka {consultationFee || "Not set"}</span></p>


        </div>
      </div>

      {/* Appointment Card */}
      <div className="mt-8 border  border-gray-300 rounded-2xl p-6 ">
        <h1 className='text-3xl text-center font-bold m-3'>Book an Appointment</h1>
        <div className='border border-dashed border-gray-300   '></div>

        <div className="flex justify-between items-center m-10">
          <span
            className={`px-4 py-1 rounded-full font-bold ${available
              ? " text-black"
              : "bg-red-100 text-red-500"
              }`}
          >
            {available ? "Available" : "Not Available"}
          </span>

          <button className="bg-green-100 text-green-700 px-5 py-2 rounded-xl hover:bg-sky-600 transition">
           Lawyer  Available Today
          </button>

        </div>

         <div className='border border-dashed border-gray-300   '></div>
         <p className='flex p-2 items-center gap-1 bg-amber-100 m-5 text-orange-400 rounded-2xl text-sm '> <CiWarning />Due to high patient volume, we are currently accepting appointments for today only. We appreciate your understanding and cooperation.</p>
       

       <button onClick={handleBookAppointment} className='bg-green-700 text-white  rounded-2xl p-3  w-full'>Book Appointment Now</button>

      </div>
    </div>
  );
};

export default LawyerDetails;