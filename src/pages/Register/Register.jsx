import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        createUser(email, password)
            .then(() => {
                return updateUserProfile({ displayName: name });
            })
            .then(() => {
                toast.success("Account created successfully!");
                navigate('/');
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handleGoogleSignUp = () => {
        setError('');
        signInWithGoogle()
            .then(() => {
                toast.success("Account created successfully!");
                navigate('/');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-sm border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">Create Account</h1>
                <p className="text-gray-400 text-sm text-center mb-6">Register to book appointments with our lawyers</p>

                <form onSubmit={handleRegister} className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password (min 6 characters)"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700"
                    />

                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-2.5 text-sm font-semibold transition disabled:opacity-60"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <button
                    onClick={handleGoogleSignUp}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition"
                >
                    <FcGoogle size={18} /> Continue with Google
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account? <Link to="/login" className="text-green-700 font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;