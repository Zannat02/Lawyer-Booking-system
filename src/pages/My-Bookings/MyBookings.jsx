import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer } from "recharts";
import useAuth from "../../hooks/useAuth";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};




const MyBookings = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [chartData, setChartData] = useState([]);

    const storageKey = `appointments_${user?.uid}`;

    useEffect(() => {
        if (!user) return;
        const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
        setAppointments(stored);
        setChartData(stored.map(appt => ({ name: appt.name, fee: Number(appt.consultationFee) || 0 })));
    }, [user]);

    const handleCancel = (id) => {
        const updated = appointments.filter(item => item.id !== id);
        setAppointments(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setChartData(updated.map(appt => ({ name: appt.name, fee: Number(appt.consultationFee) || 0 })));
        toast.error("Appointment cancelled successfully!");
    };




    return (
        <div className="p-4 sm:p-6">

            <div className="mt-6 md:mt-10 w-full h-[260px] sm:h-[340px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Bar dataKey="fee" shape={TriangleBar}>
                            <LabelList dataKey="fee" position="top" />
                            {chartData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-center mt-3">My Booked Appointments</h1>
            <p className='text-gray-500 text-sm md:text-base text-center mt-3 max-w-2xl mx-auto'>
                Our platform connects you with verified, experienced Lawyers across various specialties — all at your convenience.
            </p>

            {appointments.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No appointments booked yet.</p>
            ) : (
                <>
                    <div className="gap-5 mt-5 max-w-3xl mx-auto">
                        {appointments.map(item => (
                            <div key={item.id} className="border border-gray-300 p-4 rounded-2xl shadow-sm mb-4">
                                <div className='flex flex-col sm:flex-row justify-between items-center gap-2 m-3 sm:m-5 text-center sm:text-left'>
                                    <div>
                                        <h2 className="font-bold text-base md:text-lg">{item.name}</h2>
                                        <p className="text-gray-500 text-sm">{item.speciality}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 font-semibold text-sm md:text-base">Appointment Fee: {item.consultationFee} Taka</p>
                                    </div>
                                </div>
                                <button onClick={() => handleCancel(item.id)} className="border border-red-500 text-red-500 w-full mt-2 py-2 rounded-xl hover:bg-red-600 hover:text-white transition text-sm md:text-base">
                                    Cancel Appointment
                                </button>
                            </div>
                        ))}
                    </div>



                </>
            )}
        </div>
    );
};

export default MyBookings;