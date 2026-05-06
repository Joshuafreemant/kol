"use client";
import { useState } from "react";
import { postFetch } from "../lib/apiCall";
import { User } from "./types";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleRegister = () => {
    setLoading(true);
    postFetch("/authentication/register", {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email.toLowerCase(),
      password: user.password.toLowerCase(),
      phone_number: user.phone_number,
    })
      .then((response: any) => {
        setLoading(false);
        if (response?.response?.data?.error) {
          toast(response?.response?.data?.error, { theme: "dark" });
        } else {
          toast(response?.data?.message, { theme: "dark" });
          router.push(`/login`);
          router.refresh();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast("An error occurred. Please try again.", { theme: "dark" });
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

          <h1 className="text-[22px] font-semibold text-[#1a1a2e] leading-tight mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            K.O.L. Cooperative Society
          </h1>
          <p className="text-[15px] text-gray-500 mb-6">Create your member account</p>

          <div className="h-px bg-gray-200 mb-6" />


          {/* First & Last Name */}
          <div className="flex gap-3 mb-5">
            <div className="flex flex-col w-1/2 gap-2">
              <label className="text-[15px] font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="e.g. John"
                value={user.firstname}
                onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-lg border-[1.5px] border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#534AB7] focus:bg-white transition-colors"
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <label className="text-[15px] font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="e.g. Doe"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-lg border-[1.5px] border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#534AB7] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-[15px] font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. john.doe@email.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full text-base px-4 py-3 rounded-lg border-[1.5px] border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#534AB7] focus:bg-white transition-colors"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-[15px] font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. 08012345678"
              value={user.phone_number}
              onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
              className="w-full text-base px-4 py-3 rounded-lg border-[1.5px] border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#534AB7] focus:bg-white transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-[15px] font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
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

          {/* Submit */}
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className={`w-full py-4 text-[17px] font-semibold text-white rounded-lg tracking-wide transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#3C3489] hover:bg-[#534AB7] active:scale-[0.99]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-[18px] h-[18px] border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              "Create My Account"
            )}
          </button>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-gray-200 text-center text-[14px] text-gray-500">
            Already a member?{" "}
            <a href="/login" className="text-[#534AB7] font-medium hover:underline">
              Sign in here
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Register;