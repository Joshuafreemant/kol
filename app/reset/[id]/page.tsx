"use client";

import { useState } from "react";
import { postFetch } from "../../lib/apiCall";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reset = ({ params }: any) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>({
    password: "",
    confirmPassword: "",
  });

  const passwordsMatch = user.password === user.confirmPassword;
  const canSubmit = user.password && user.confirmPassword && passwordsMatch;

  const handleReset = () => {
    if (!canSubmit) return;
    setLoading(true);
    postFetch("/authentication/reset-password", {
      password: user.password,
      resetToken: params.id,
    })
      .then((response: any) => {
        setLoading(false);
        toast("Password reset successful. Please sign in.", { theme: "dark" });
        router.push(`/login`);
        router.refresh();
      })
      .catch((error: any) => {
        setLoading(false);
        toast(error?.response?.data?.message || "An error occurred. Please try again.", {
          theme: "dark",
        });
      });
  };

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f4f9] px-4 py-10 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(60,52,137,0.08)] p-10">

          {/* Emblem */}
          <div className="w-14 h-14 rounded-full bg-[#3C3489] flex items-center justify-center mb-6">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 3L4 8v6c0 5.25 4.27 10.16 10 11.33C19.73 24.16 24 19.25 24 14V8L14 3z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M10 14l3 3 5-5"
                stroke="#3C3489"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1
            className="text-[22px] font-semibold text-[#1a1a2e] leading-tight mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Reset Your Password
          </h1>
          <p className="text-[15px] text-gray-500 mb-6">
            Enter and confirm your new password below
          </p>

          <div className="h-px bg-gray-200 mb-6" />

          <div className="bg-[#f5f4f9] border-l-[3px] border-[#534AB7] rounded-r-lg px-4 py-3 text-[13px] text-gray-500 leading-relaxed mb-6">
            Choose a strong password you have not used before. You will be redirected to sign in after resetting.
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-[15px] font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full text-base px-4 py-3 pr-12 rounded-lg border-[1.5px] border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#534AB7] focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-[15px] font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleReset()}
                className={`w-full text-base px-4 py-3 pr-12 rounded-lg border-[1.5px] bg-gray-50 text-gray-900 outline-none transition-colors focus:bg-white ${
                  user.confirmPassword && !passwordsMatch
                    ? "border-red-400 focus:border-red-400"
                    : user.confirmPassword && passwordsMatch
                    ? "border-green-400 focus:border-green-400"
                    : "border-gray-300 focus:border-[#534AB7]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Password mismatch message */}
          <div className="min-h-[20px] mb-4">
            {user.confirmPassword && !passwordsMatch && (
              <p className="text-[13px] text-red-500 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Passwords do not match
              </p>
            )}
            {user.confirmPassword && passwordsMatch && (
              <p className="text-[13px] text-green-600 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Passwords match
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleReset}
            disabled={loading || !canSubmit}
            className={`w-full py-4 text-[17px] font-semibold text-white rounded-lg tracking-wide transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : !canSubmit
                ? "bg-[#a09cc4] cursor-not-allowed"
                : "bg-[#3C3489] hover:bg-[#534AB7] active:scale-[0.99]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-[18px] h-[18px] border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
                Resetting password...
              </span>
            ) : (
              "Reset My Password"
            )}
          </button>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-gray-200 text-center text-[14px] text-gray-500">
            Remembered your password?{" "}
            <a href="/login" className="text-[#534AB7] font-medium hover:underline">
              Sign in here
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Reset;