"use client";

import { useVerifyOtp } from "@/hooks/auth";
import { ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import { Cookies } from "react-cookie";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const cookie = new Cookies();
  const userId = cookie.get("id");

  const { mutate, isPending } = useVerifyOtp();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === 5 && newOtp.every((d) => d !== "")) {
      mutate({ otp: newOtp.join(""), userId: String(userId) });
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();

    if (pasted.length === 6) {
      mutate({ otp: pasted, userId: String(userId) });
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-950 p-4">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Verify OTP
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-8">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP BOXES */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              maxLength={1}
              inputMode="numeric"
              disabled={isPending}
              pattern="\d*"
              className="w-12 h-12 text-center text-xl font-semibold rounded-xl bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          disabled={isPending}
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
        >
          {isPending ? "Verifying" : "Verify"}
        </button>

        {/* RESEND */}
        <p className="text-gray-500 dark:text-slate-400 text-sm mt-4">
          Didn&apos;t receive code?{" "}
          <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
