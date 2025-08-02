import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white font-poppins px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 text-center shadow-xl mb-16 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow">
          Trivia Challenge
        </h1>
        <p className="text-xl text-slate-200">
          Test your brain with random questions and compete for the best score!
        </p>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-100 transition duration-300 shadow-lg"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-100 text-blue-900 font-semibold rounded-full hover:bg-white transition duration-300 shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
