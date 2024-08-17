import React from "react";

const UserProfile = ({ name, avatarUrl, regNo }) => {
  return (
    <div className="flex items-center p-4   shadow rounded-lg  min-w-64 min-h-64 bg-black">
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
