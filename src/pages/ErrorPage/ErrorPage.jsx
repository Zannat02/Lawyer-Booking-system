import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 text-center w-full sm:w-[400px]">
        <div className="text-red-500 text-5xl md:text-6xl font-bold mb-4">404</div>
        <h1 className="text-xl md:text-2xl font-semibold mb-2">Page Not Found</h1>
        <p className="text-gray-500 text-sm md:text-base mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition text-sm md:text-base">
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;