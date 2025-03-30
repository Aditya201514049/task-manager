import React from "react";

const Profile = ({ user, token }) => {
  return (
    <div className="max-w-4xl mx-auto pt-8 pb-12 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center border-b border-gray-200 py-3">
              <span className="w-1/3 font-medium text-gray-600">Name:</span>
              <span className="w-2/3 text-gray-900">{user?.name}</span>
            </div>
            
            <div className="flex items-center border-b border-gray-200 py-3">
              <span className="w-1/3 font-medium text-gray-600">Email:</span>
              <span className="w-2/3 text-gray-900">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 