"use client";
import React from "react";
import Lapuinfo from "@/components/lapuinfo";
import useUserStore from "@/store/useUserStore";
const MyProfile = () => {
  const { registrationNumber } = useUserStore();
  return (
    <div>
      <Lapuinfo registrationNumber={registrationNumber} />
    </div>
  );
};

export default MyProfile;
