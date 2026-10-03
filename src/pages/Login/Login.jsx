import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { signIn, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);
        signIn(email, password)
            .then(() => {
                toast.success("Logged in successfully!");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handleGoogleLogin = () => {
        setError('');
        signInWithGoogle()
            .then(() => {
                toast.success("Logged in successfully!");
                navigate(from, { replace: true });
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-sm border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">Welcome Back</h1>
                <p className="text-gray-400 text-sm text-center mb-6">Login to book and manage your appointments</p>

                <form onSubmit={handleLogin} className="space-y-3">
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
                        placeholder="Password"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700"
                    />

                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-2.5 text-sm font-semibold transition disabled:opacity-60"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition"
                >
                    <FcGoogle size={18} /> Continue with Google
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account? <Link to="/register" className="text-green-700 font-semibold hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;