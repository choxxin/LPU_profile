import React, { useEffect, useState } from "react";
import { getProfileByRegistrationNumber } from "@/app/api/umsinfo";

const Lapuinfo = ({ registrationNumber }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const data = await getProfileByRegistrationNumber(registrationNumber);
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (registrationNumber) {
      fetchProfileData();
    }
  }, [registrationNumber]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {profileData ? (
        <div className="min-h-32 w-full border-2 border-black">
          <div className="border-2 border-black gap-5 flex">
            <div className="text-5xl text-bold text-gray-800">
              <p>{profileData.user.name}</p>
            </div>
            <div className="text-xl mt-7 text-semibold text-gray-600">
              <p>Reg No:{profileData.user.registrationNumber}</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div
              className="radial-progress text-gray-600 text-2xl"
              style={{
                "--value": (profileData.cgpa / 10) * 100,
                "--size": "12rem",
                "--thickness": "1.5rem",
              }}
              role="progressbar"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {hover
                ? `${((profileData.cgpa / 10) * 100).toFixed(1)}%`
                : `CGPA: ${profileData.cgpa}`}
            </div>
            <div>
              <div className="text-3xl font-bold mt-3 font-mono text-gray-600">
                <p>Section: {profileData.section}</p>
              </div>
              <div className="mt-8 font-semibold ">
                <p>Program: {profileData.program}</p>

                <p>Roll Number: {profileData.roll_number}</p>
                <p>Aggregate Attendance: {profileData.agg_attendance}%</p>
              </div>
            </div>
          </div>

          <div>{/* Add more fields as needed */}</div>
        </div>
      ) : (
        <div className="min-h-32 w-full border-2 border-black">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default Lapuinfo;
