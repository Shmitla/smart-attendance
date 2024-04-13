'use client'
import React from 'react';
import './tailwind.css';

const SideNavDashboard = ({ userName, onLogout }) => {
  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-gray-200 p-4">
        <ul>
          <li><a href="#" className="text-blue-500 hover:text-blue-600">Home</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-600">Classes</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-600">Subjects</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-600">Students</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-600">Notices</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-600">Complains</a></li>
        </ul>
      </div>
      <div className="bg-gray-200 p-4">
        <hr className="my-4" />
        <p className="text-lg font-semibold">{`User: ${userName}`}</p>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
      </div>
    </div>
  );
};

export default SideNavDashboard;
