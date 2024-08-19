import React from "react";
import useUserStore from "@/store/useUserStore";
const Leetcode = ({ leetcode, switchprofile, username, reg_no }) => {
  const { registrationNumber } = useUserStore();
  console.log(leetcode);
  const changeprofile = () => {
    switchprofile();
  };
  return (
    <div className="flex flex-col min-w-64 md:flex-row gap-10   mt-5 py-11 gradient-profile ">
      <div className="flex flex-col gap-1 py-10 ml-5">
        <p className="text-center text-3xl gradient-blue   font-bold">
          {username}
        </p>
        <div>
          {" "}
          <p className="text-gray-300 text-xl text-bold text-center">
            Total solved:
          </p>
        </div>
        <div>
          {" "}
          <p className="text-center text-8xl     gradient-yellow  font-bold">
            {leetcode.solvedProblem}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-gray-300 text-xl text-bold  ">
          Easy solved: {leetcode.easySolved}
        </p>
        {/* Calculate the percentage of easy problems solved */}
        <div
          className="radial-progress gradient-green "
          style={{
            "--value": leetcode.solvedProblem
              ? (leetcode.easySolved / leetcode.solvedProblem) * 100
              : 0,
          }}
          role="progressbar "
        >
          {/* Display the percentage inside the radial progress bar */}
          {(leetcode.solvedProblem
            ? (leetcode.easySolved / leetcode.solvedProblem) * 100
            : 0
          ).toFixed(2)}
          %
        </div>
      </div>
      {/* //medium-progress */}
      <div className="flex flex-col gap-1">
        <p className="text-gray-300 text-xl text-bold">
          Medium solved: {leetcode.mediumSolved}
        </p>
        {/* Calculate the percentage of medium problems solved */}
        <div
          className="radial-progress gradient-med"
          style={{
            "--value": leetcode.solvedProblem
              ? (leetcode.mediumSolved / leetcode.solvedProblem) * 100
              : 0,
          }}
          role="progressbar"
        >
          {(leetcode.solvedProblem
            ? (leetcode.mediumSolved / leetcode.solvedProblem) * 100
            : 0
          ).toFixed(2)}
          %
        </div>
      </div>
      {/* hard */}
      <div className="flex flex-col gap-1">
        <p className="text-gray-300 text-xl text-bold  ">
          Hard solved: {leetcode.hardSolved}
        </p>

        {/* Calculate the percentage of hard problems solved */}
        <div
          className="radial-progress gradient-hard"
          style={{
            "--value": leetcode.solvedProblem
              ? (leetcode.hardSolved / leetcode.solvedProblem) * 100
              : 0,
          }}
          role="progressbar"
        >
          {(leetcode.solvedProblem
            ? (leetcode.hardSolved / leetcode.solvedProblem) * 100
            : 0
          ).toFixed(2)}
          %
        </div>
      </div>
      <div>
        {" "}
        {reg_no === registrationNumber && (
          <button onClick={changeprofile} className="btn btn-accent mt-8">
            Change Username
            <img
              src="https://leetcode.com/static/images/LeetCode_Sharing.png"
              height={80}
              width={80}
              alt=""
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Leetcode;
