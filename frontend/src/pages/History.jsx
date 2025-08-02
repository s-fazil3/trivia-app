import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    const user = JSON.parse(localStorage.getItem("user")); 
    if (!user || !token) {
      navigate('/login');
      return;
    }
    const fetchHistory = async () => {
      try {
        const res = await axios.get('https://trivia-quiz-backend1.onrender.com', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(res.data || []);
      } catch (err) {
        console.error('Failed to fetch quiz history:', err);
        if (err.response?.status === 403) {
          localStorage.removeItem("user");
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 px-4 py-10 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">📜 Your Quiz History</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading quiz history...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-600">No quiz attempts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Score</th>
                  <th className="px-4 py-2 border">Difficulty</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border font-semibold">{item.score}</td>
                    <td className="px-4 py-2 border capitalize">{item.difficulty}</td>
                    <td className="px-4 py-2 border text-sm text-gray-500">
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 block mx-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default History;
