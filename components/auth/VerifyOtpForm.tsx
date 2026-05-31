"use client";

import { useVerifyOtp } from "@/hooks/auth";
import { useState } from "react";

import { Cookies } from "react-cookie";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const cookie = new Cookies();
  const userId = cookie.get("id");

  const { mutate } = useVerifyOtp();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter full OTP");
      return;
    }

    mutate({
      otp: finalOtp,
      userId: String(userId),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">Verify OTP</h2>
        <p className="text-gray-400 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP BOXES */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="w-12 h-12 text-center text-xl font-semibold rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
        >
          Verify
        </button>

        {/* RESEND */}
        <p className="text-gray-400 text-sm mt-4">
          Didn’t receive code?{" "}
          <button className="text-blue-400 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
