import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';
const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://trivia-quiz-backend1.onrender.com', credentials);

      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem('token', token);
       const decoded = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decoded)); 

        setMessage({ type: 'success', text: 'Login successful!' });

        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage({ type: 'error', text: 'Invalid token received.' });
      }
    } catch (err) {
      const errorMsg = err.response?.data || 'Login failed';
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg animate-fadeIn">
        <h2 className="text-3xl text-center font-bold text-white mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-white">
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-100 transition-all duration-300 shadow-md"
          >
            Log In
          </button>
          {message && (
            <p
              className={`text-center text-sm mt-2 font-semibold ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message.text}
            </p>
          )}
          <p className="text-center text-sm mt-4">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-blue-300 hover:underline cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
