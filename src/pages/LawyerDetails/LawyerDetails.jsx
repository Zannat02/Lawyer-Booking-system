import React, { useState } from 'react';
import { useLoaderData, useNavigate, useParams, useLocation } from 'react-router';
import { CiWarning } from "react-icons/ci";
import { LuCalendarDays, LuClock } from "react-icons/lu";

import { toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const LawyerDetails = () => {

  const { id } = useParams();

  const data = useLoaderData();

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const singleLawyer = data.find(lawyer => lawyer.id === parseInt(id));

  if (!singleLawyer) {
    return <p className="text-center text-red-500 mt-10">Lawyer not found!</p>;
  }

  const { name, experience, licenseNumber, availability, consultationFee, speciality, image, available } = singleLawyer;

  const todayStr = new Date().toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setSelectedDate('');
      return;
    }
    const weekday = DAY_NAMES[new Date(value).getDay()];
    if (availability && availability.length > 0 && !availability.includes(weekday)) {
      toast.warning(`This lawyer is not available on ${weekday}. Available days: ${availability.join(', ')}`);
      setSelectedDate('');
      return;
    }
    setSelectedDate(value);
  };

  const handleBookAppointment = () => {

    if (!user) {
      toast.warning("Please login to book an appointment!");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.warning("Please select a date and time for your appointment!");
      return;
    }

    const appointment = {
      name,
      speciality,
      consultationFee,
      id: singleLawyer.id,
      date: selectedDate,
      time: selectedTime,
    };

    const storageKey = `appointments_${user.uid}`;
    const existing = JSON.parse(localStorage.getItem(storageKey)) || [];


    const alreadyBooked = existing.find(item => item.id === appointment.id);
    if (alreadyBooked) {
      toast.warning("Already booked this lawyer!");
      return;
    }


    existing.push(appointment);
    localStorage.setItem(storageKey, JSON.stringify(existing));

    toast.success("Appointment booked successfully!");
    navigate("/bookings");
  };


  return (
    <div className="px-4 sm:px-0">
      <div className='bg-slate-200 p-6 sm:p-10 md:p-15 rounded-2xl mb-5'>
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-3">Lawyer's Profile Details</h1>
        <p className='text-gray-500 text-sm md:text-base text-center w-full md:w-2/3 mx-auto'>Meet our experienced and verified lawyers who are dedicated to providing trusted legal support and expert advice. Each professional is committed to ensuring justice, confidentiality, and the best outcome for every client they serve.</p>
      </div>


      <div className="flex flex-col sm:flex-row gap-6 border border-gray-300 sm:m-6 md:m-10 p-5 md:p-10 rounded-2xl">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 sm:w-48 sm:h-48 rounded-xl object-cover border mx-auto sm:mx-0"
        />
        <div className='flex flex-col justify-center gap-2 items-center sm:items-start text-center sm:text-left'>
          <p className="bg-sky-100 rounded-2xl text-sky-400 text-center text-xs md:text-sm w-fit px-3"> {experience}+ years experience</p>
          <h2 className="text-xl md:text-2xl font-bold">{name}</h2>
          <div className='flex flex-wrap gap-3 md:gap-5 justify-center sm:justify-start'>

            <p className="text-gray-500 text-xs md:text-sm">{speciality}</p>

            <p className="text-gray-600 text-xs md:text-sm">License No: {licenseNumber}</p>
          </div>


          <div className="mt-3 flex items-center gap-2 flex-nowrap overflow-x-auto justify-center sm:justify-start w-full">
            <span className="font-semibold text-xs md:text-sm shrink-0">Availability:</span>
            {availability && availability.length > 0 ? (
              availability.map((day, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-300 px-3 py-1 rounded-full text-xs md:text-sm shrink-0"
                >
                  {day}
                </span>
              ))
            ) : (
              <span className="text-gray-400 ml-2 text-xs md:text-sm shrink-0">Not specified</span>
            )}
          </div>



          <p className="mt-2 text-xs md:text-sm">Consultation Fee: <span className='text-green-800 font-bold'>Taka {consultationFee || "Not set"}</span></p>


        </div>
      </div>

      {/* Appointment Card */}
      <div className="mt-8 border border-gray-300 rounded-2xl p-4 md:p-6">
        <h1 className='text-2xl md:text-3xl text-center font-bold m-3'>Book an Appointment</h1>
        <div className='border border-dashed border-gray-300'></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 m-5 md:m-10">
          <span
            className={`px-4 py-1 rounded-full font-bold text-sm md:text-base ${available
              ? " text-black"
              : "bg-red-100 text-red-500"
              }`}
          >
            {available ? "Available" : "Not Available"}
          </span>

          <button className="bg-green-100 text-green-700 px-4 md:px-5 py-2 rounded-xl hover:bg-sky-600 transition text-sm md:text-base">
            Lawyer  Available Today
          </button>

        </div>

        <div className='border border-dashed border-gray-300'></div>

        {/* Date & Time Picker */}
        <div className="m-3 md:m-5 space-y-4">
          <div>
            <label className="flex items-center gap-1.5 font-semibold text-xs md:text-sm mb-2">
              <LuCalendarDays size={16} /> Select a date
            </label>
            <input
              type="date"
              min={todayStr}
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700"
            />
            <p className="text-gray-400 text-xs mt-1">Available on: {availability?.join(', ') || 'Not specified'}</p>
          </div>

          <div>
            <label className="flex items-center gap-1.5 font-semibold text-xs md:text-sm mb-2">
              <LuClock size={16} /> Select a time
            </label>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm border transition ${selectedTime === slot
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-green-700'
                    }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='border border-dashed border-gray-300'></div>
        <p className='flex p-2 items-center gap-1 bg-amber-100 m-3 md:m-5 text-orange-400 rounded-2xl text-xs md:text-sm '> <CiWarning />Due to high patient volume, we are currently accepting appointments for today only. We appreciate your understanding and cooperation.</p>


        <button onClick={handleBookAppointment} className='bg-green-700 text-white  rounded-2xl p-3  w-full text-sm md:text-base'>Book Appointment Now</button>

      </div>
    </div>
  );
};

export default LawyerDetails;