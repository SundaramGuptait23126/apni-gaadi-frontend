import React from 'react';
import { FiBox, FiHeart, FiClock, FiFileText, FiSettings } from 'react-icons/fi';
import { IoCarOutline } from 'react-icons/io5';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

export default function ProfilePage() {
  const menuItems = [
    { id: 1, label: 'My Orders', icon: <FiBox className="text-xl" /> },
    { id: 2, label: 'Shortlisted Vehicles', icon: <FiHeart className="text-xl" /> },
    { id: 3, label: 'My Activity', icon: <FiClock className="text-xl" /> },
    { id: 4, label: 'My Vehicles', icon: <FiFileText className="text-xl" /> },
    { id: 5, label: 'My Garage', icon: <IoCarOutline className="text-xl" /> },
    { id: 6, label: 'Manage Consents', icon: <FiSettings className="text-xl" /> },
    { id: 7, label: 'Profile Settings', icon: <FiSettings className="text-xl" /> },
  ];

  return (
    <div className="min-h-screen bg-white md:bg-gray-100 md:py-8 flex justify-center">
      <div className="w-full max-w-md bg-white md:shadow-md md:rounded-xl overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="bg-[#f4f6f9] px-6 py-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#8ba4be] text-white rounded-full flex items-center justify-center text-2xl mb-4 font-semibold">
            S
          </div>
          <h2 className="text-gray-900 font-medium text-lg">Sundaramgupta</h2>
          <p className="text-gray-700 text-sm mt-1">9453028301</p>
          <a href="#" className="text-[#3a82f6] text-sm mt-2 hover:underline">
            Link your e-mail or social account
          </a>
        </div>

        {/* Menu Items */}
        <div className="px-2 py-4 flex-grow">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4 text-gray-800">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <MdOutlineKeyboardArrowRight className="text-gray-500 text-2xl" />
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4 mb-4">
          <button className="w-full py-3 px-4 border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
