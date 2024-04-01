"use client";

import { useState } from "react";
import { User } from "../register/types";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { postFetch } from "../lib/apiCall";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const forgot = () => {
  const router = useRouter();
  const [actionType, setActionType] = useState("password");

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<any>({
    email: ""
  });

  

  const handleLogin = () => {
    setLoading(true);
    postFetch("/authentication/forgot-password", {
      email: user.email.toLowerCase(),
    })
      .then((response: any) => {
        setLoading(false);
       console.log(response)
      
       if (response?.response?.data?.error) {
        toast(response.response.data.error, {
          theme: "dark",
        });
        return; // Exit the function early if there's an error
      }

       toast(response?.data?.message, {
        theme: "dark",
      });
      })
      .catch((error:any) => {
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
        <div className="px-6 md:px-0 w-full md:w-5/12 lg:w-4/12 lg:-ml-[240px] ">
          <h1 className="md:text-3xl text-2xl font-bold">
           Forgot Password
          </h1>
          <h1 className=" text-md mt-4">
            Enter your email address to recover password
          </h1>
          <div className="border border-gray-300 p-6 rounded mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm">
                Email Address
              </label>
              <input
                type="text"
                onChange={(e: any) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                placeholder="Email Address"
                className="text-sm p-2 rounded outline-none border border-gray-300"
              />
            </div>

          

            <div className="flex flex-col gap-2 mt-6">
              {loading ? (
                <div className="bg-purple-800 rounded text-white p-2 text-center">
                  <label>Loading...</label>
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-purple-800 rounded text-white p-2"
                  onClick={() => handleLogin()}
                >
                  Submit
                </button>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="font-semibold text-xs">
                Don't have an Account yet?{" "}
              </p>
              <Link
                href="/register"
                className="text-purple-900 font-semibold text-xs"
              >
                Register
              </Link>
            </div>

           
          </div>
        </div>
      </div>
    </>
  );
};

export default forgot;
