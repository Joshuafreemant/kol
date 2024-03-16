"use client";

import { useState } from "react";
import { User } from "../../register/types";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { postFetch } from "../../lib/apiCall";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const reset = ({ params }:any) => {
  const router = useRouter();
  const [actionType, setActionType] = useState("password");

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<any>({
    password: "",
    confirmPassword: "",
  });


  const handleLogin = () => {
    setLoading(true);
    postFetch("/authentication/reset-password", {
      password: user.password,
      resetToken: params.id,
    })
      .then((response: any) => {
        setLoading(false);
        console.log(response);
        router.push(`/login`);
      })
      .catch((error: any) => {
        console.log(error);
        toast(error?.response?.data?.message, {
          theme: "dark",
        });
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="px-12 md:px-0 w-full md:w-5/12 lg:w-4/12 lg:-ml-[240px] ">
          <h1 className="md:text-3xl text-2xl font-bold">Reset Password</h1>
          <h1 className="text-md mt-4">Enter New password to reset password</h1>
          <div className="border border-gray-300 p-6 rounded mt-4">
            <div className="flex flex-col gap-2 mt-6">
              <label htmlFor="" className="text-sm">
                New Password
              </label>
              <div className="rounded outline-none border border-gray-300 flex items-center">
                <input
                  type={actionType}
                  onChange={(e: any) =>
                    setUser({
                      ...user,
                      password: e.target.value,
                    })
                  }
                  placeholder="New Password"
                  className="text-sm p-2 w-11/12 outline-none"
                />
                {actionType === "password" ? (
                  <IoIosEye onClick={() => setActionType("text")} />
                ) : (
                  <IoIosEyeOff onClick={() => setActionType("password")} />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label htmlFor="" className="text-sm">
                Confirm Password
              </label>
              <div className="rounded outline-none border border-gray-300 flex items-center">
                <input
                  type={actionType}
                  onChange={(e: any) =>
                    setUser({
                      ...user,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm Password"
                  className="text-sm p-2 w-11/12 outline-none"
                />
                {actionType === "password" ? (
                  <IoIosEye onClick={() => setActionType("text")} />
                ) : (
                  <IoIosEyeOff onClick={() => setActionType("password")} />
                )}
              </div>
            </div>
            <p className="text-xs text-red-500 mt-3">
              {user.password !== user.confirmPassword
                ? "Password does not match"
                : ""}
            </p>
            <div className="flex flex-col gap-2 mt-4">
              {loading ? (
                <div className="bg-purple-800 rounded text-white p-2 text-center">
                  <label>Loading...</label>
                </div>
              ) : (
                <>
                  {user.password !== user.confirmPassword ? (
                    <button
                      type="submit"
                      className="bg-purple-200 rounded text-white p-2"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-purple-800 rounded text-white p-2"
                      onClick={() => handleLogin()}
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default reset;
