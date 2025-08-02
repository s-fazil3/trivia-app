import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: ''
  });
  const [message, setMessage] = useState('');
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, rePassword } = form;

    if (password !== rePassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('/auth/signup', { name, email, password });
      setMessage("✅ " + res.data);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage("❌ " + (err.response?.data || 'Signup failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg animate-fadeIn">
        <h2 className="text-3xl text-center font-bold text-white mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-white">
          <div>
            <label className="block mb-1 text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
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
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Re-enter Password</label>
            <input
              type="password"
              name="rePassword"
              required
              value={form.rePassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-100 transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>
          {message && (
            <p className="text-center text-sm mt-2 text-blue-200 font-semibold">
              {message}
            </p>
          )}
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-300 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
