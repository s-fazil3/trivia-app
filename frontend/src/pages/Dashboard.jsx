import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../components/ProfileMenu'; 
const Dashboard = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('easy');

  const startQuiz = () => {
    navigate(`/quiz?difficulty=${difficulty}`);
  };
useEffect(() => {
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/login");
  }
}, []);
  return (
    <>
      <div className="absolute top-6 right-6">
        <ProfileMenu />
      </div>
    
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 flex flex-col items-center justify-center px-4 text-gray-800">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-10 text-center transition-all duration-300">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">🎯 Welcome to Trivia Master!</h1>
        <p className="text-lg mb-6 text-gray-600">
          Select your difficulty level and start your quiz journey!
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {['easy', 'medium', 'hard'].map(level => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-md shadow-md font-semibold transition ${
                difficulty === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={startQuiz}
          className="mt-4 px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:bg-blue-800 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
    </>
  );
};

export default Dashboard;