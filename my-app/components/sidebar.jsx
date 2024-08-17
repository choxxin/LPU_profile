import React from "react";

const UserProfile = ({ name, avatarUrl, regNo }) => {
  return (
    <div
      className="flex items-center p-4   shadow     min-w- min-h-16    
    bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100"
    >
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="w-16 h-16 rounded-full"
      />
      <div className="ml-4">
        <h2 className="text-xl text-white font-semibold">{name}</h2>
        <p className="text-gray-5 00 text-white">{regNo}</p>
      </div>
    </div>
  );
};

export default UserProfile;
