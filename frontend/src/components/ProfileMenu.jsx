import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const ProfileMenu = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)} className="text-3xl text-blue-800 hover:text-blue-600">
          <FaUserCircle />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 text-left text-gray-700">
            <p className="font-semibold text-lg mb-1">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>

            <li
              onClick={() => navigate('/history')}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer list-none"
            >
              Quiz History
            </li>

            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 text-sm mt-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
