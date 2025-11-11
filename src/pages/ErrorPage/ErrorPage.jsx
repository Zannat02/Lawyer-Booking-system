
import React from "react";
import { useNavigate } from "react-router";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center w-[90%] sm:w-[400px]">
        <div className="text-red-500 text-6xl font-bold mb-4">404</div>
        <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

