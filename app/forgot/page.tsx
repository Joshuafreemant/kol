"use client";

import { useState } from "react";
import { postFetch } from "../lib/apiCall";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgot = () => {
    if (!email) {
      toast("Please enter your email address.", { theme: "dark" });
      return;
    }
    setLoading(true);
    postFetch("/authentication/forgot-password", {
      email: email.toLowerCase(),
    })
      .then((response: any) => {
        setLoading(false);

        if (response?.response?.data?.error) {
          toast(response.response.data.error, { theme: "dark" });
          return;
        }

        toast(response?.data?.message, { theme: "dark" });
        setSubmitted(true);
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
            Forgot Password?
          </h1>
          <p className="text-[15px] text-gray-500 mb-6">
            Enter your email and we will send you a recovery link
          </p>

          <div className="h-px bg-gray-200 mb-6" />

          {submitted ? (
            // ─── Success state ────────────────────────────────────────────────
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
              </div>
              <h2 className="text-[18px] font-semibold text-[#1a1a2e] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Check your email
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-1">
                We have sent a password recovery link to
              </p>
              <p className="text-[15px] font-semibold text-[#3C3489] mb-6">
                {email}
              </p>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                Did not receive it? Check your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#534AB7] font-medium hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
          ) : (
            // ─── Form state ───────────────────────────────────────────────────
            <>
              <div className="bg-[#f5f4f9] border-l-[3px] border-[#534AB7] rounded-r-lg px-4 py-3 text-[13px] text-gray-500 leading-relaxed mb-6">
                Enter the email address linked to your cooperative account. A reset link will be sent to you.
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-[15px] font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. john.doe@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleForgot()}
                  className="w-full text-base px-4 py-3 rounded-lg border-[1.5px] border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#534AB7] focus:bg-white transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={handleForgot}
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
                    Sending recovery link...
                  </span>
                ) : (
                  "Send Recovery Link"
                )}
              </button>

              <div className="mt-6 pt-5 border-t border-gray-200 flex justify-between text-[14px] text-gray-500">
                <span>
                  Remembered it?{" "}
                  <a href="/login" className="text-[#534AB7] font-medium hover:underline">
                    Sign in
                  </a>
                </span>
                <a href="/register" className="text-[#534AB7] font-medium hover:underline">
                  Register
                </a>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Forgot;