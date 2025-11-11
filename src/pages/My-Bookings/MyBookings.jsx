import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";

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
    const [appointments, setAppointments] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("appointments")) || [];
        setAppointments(stored);
        setChartData(stored.map(appt => ({ name: appt.name, fee: Number(appt.consultationFee) || 0 })));
    }, []);

    const handleCancel = (id) => {
        const updated = appointments.filter(item => item.id !== id);
        setAppointments(updated);
        localStorage.setItem("appointments", JSON.stringify(updated));
        setChartData(updated.map(appt => ({ name: appt.name, fee: Number(appt.consultationFee) || 0 })));
        toast.error("Appointment cancelled successfully!");
    };




    return (
        <div className="p-6">




            <div className="mt-10 flex justify-center">
                <BarChart width={700} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="fee" shape={TriangleBar}>
                        <LabelList dataKey="fee" position="top" />
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>

            <h1 className="text-3xl font-bold text-center mt-3">My Booked Appointments</h1>
            <p className='text-gray-500 text-center mt-3'>
                Our platform connects you with verified, experienced Lawyers across various specialties — all at your convenience.
            </p>

            {appointments.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No appointments booked yet.</p>
            ) : (
                <>
                    <div className="gap-5 mt-5">
                        {appointments.map(item => (
                            <div key={item.id} className="border border-gray-300 p-4 rounded-2xl shadow-sm">
                                <div className='flex justify-between items-center m-5'>
                                    <div>
                                        <h2 className="font-bold text-lg">{item.name}</h2>
                                        <p className="text-gray-500">{item.speciality}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 font-semibold">Appointment Fee: {item.consultationFee} Taka</p>
                                    </div>
                                </div>
                                <button onClick={() => handleCancel(item.id)} className="border border-red-500 text-red-500 w-full mt-2 py-2 rounded-xl hover:bg-red-600 hover:text-white transition">
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

