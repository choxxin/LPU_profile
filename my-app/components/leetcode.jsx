import React from "react";

const Leetcode = ({ leetcode, switchprofile, username }) => {
  console.log(leetcode);
  const changeprofile = () => {
    switchprofile();
  };
  return (
    <div className="flex flex-col min-w-64 md:flex-row gap-10   border-black border-2 py-11">
      <div className="flex flex-col gap-1 py-10 ">
        <p className="text-center text-3xl text-gray-800   font-bold">
          {username}
        </p>
        <div>
          {" "}
          <p className="text-gray-500 text-xl text-bold">
            Total problem solved:
          </p>
        </div>
        <div>
          {" "}
          <p className="text-center text-8xl text-gray-500   text-bold">
            {leetcode.solvedProblem}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-gray-500 text-xl text-bold">
          Easy solved: {leetcode.easySolved}
        </p>
        {/* Calculate the percentage of easy problems solved */}
        <div
          className="radial-progress text-green-600 "
          style={{
            "--value": leetcode.solvedProblem
              ? (leetcode.easySolved / leetcode.solvedProblem) * 100
              : 0,
          }}
          role="progressbar"
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
        <p className="text-gray-500 text-xl text-bold">
          Medium solved: {leetcode.mediumSolved}
        </p>
        {/* Calculate the percentage of medium problems solved */}
        <div
          className="radial-progress text-yellow-600"
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
        <p className="text-gray-500 text-xl text-bold">
          Hard solved: {leetcode.hardSolved}
        </p>

        {/* Calculate the percentage of hard problems solved */}
        <div
          className="radial-progress text-red-500"
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
        <button onClick={changeprofile} className="btn btn-accent mt-8">
          Change Username
          <img
            src="https://leetcode.com/static/images/LeetCode_Sharing.png"
            height={80}
            width={80}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Leetcode;
