"use state";
import { useEffect, useState } from "react";
import { getProfileByRegistrationNumber } from "@/app/api/umsinfo";
import Leetcode from "./leetcode";
import NOLeetcode from "./noleetcode";
import { handleleetcodeprofile } from "@/app/api/umsinfo";
import toast from "react-hot-toast";
const Lapuinfo = ({ registrationNumber }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  const [leetcodeProfile, setLeetcodeProfile] = useState(null);
  // const [leetcodeusername, setleetcodeusername] = useState(null);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const data = await getProfileByRegistrationNumber(registrationNumber);
      setProfileData(data);
      console.log(data.user.leetcode_username);
      if (data.user.leetcode_username) {
        const leetData = await handleleetcodeprofile(
          data.user.leetcode_username
        );
        setLeetcodeProfile(leetData);
      } else {
        setLeetcodeProfile(null);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch profile data", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (registrationNumber) {
      fetchProfileData();
    }
  }, [registrationNumber]);

  //For fetching leetcode api
  // useEffect(() => {
  //   // Fetch the user data on mount
  //   const fetchUser = async () => {
  //     try {
  //       if (profileData.leetcode_username) {
  //         const Leetdata = await handleleetcodeprofile(
  //           profileData.leetcode_profile
  //         );
  //         setLeetcodeProfile(Leetdata);
  //         setleetcodeusername(profileData.leetcode_username);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //       setError("Failed to fetch user data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);
  const handleProfileSaved = () => {
    fetchProfileData(); // Refresh profile data
  };
  const changeleetprofile = () => {
    setLeetcodeProfile(null);
  };
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-ring   h-60 font-bold  loading-lg"></span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {profileData ? (
        <div className="min-h-32 w-full border-2 border-black ">
          <div className="border-2 border-black gap-5 flex">
            <div className="avatar">
              <div className="mask mask-squircle w-44">
                <img src={profileData.user.profile_image} />
              </div>
            </div>

            <div className="text-5xl text-bold text-gray-800">
              <p>{profileData.user.name}</p>
            </div>
            <div className="text-xl mt-7 text-semibold text-gray-600">
              <p>Reg No:{profileData.user.registrationNumber}</p>
            </div>
          </div>
          <div className="flex gap-5 mt-6">
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
          <div>
            {leetcodeProfile ? (
              <Leetcode
                leetcode={leetcodeProfile}
                switchprofile={changeleetprofile}
                username={profileData.user.leetcode_username}
                reg_no={profileData.user.registrationNumber}
              />
            ) : (
              <NOLeetcode
                reg_no={registrationNumber}
                onProfileSaved={handleProfileSaved}
                name={profileData.user.name}
              />
            )}
          </div>
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
