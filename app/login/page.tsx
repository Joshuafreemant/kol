"use client";

import { useRef, useState } from "react";
import { User } from "../register/types";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { postFetch } from "../lib/apiCall";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from '../../redux/store';
import { setUserss } from "@/redux/slices/userSlice";

const login = () => {
  const router = useRouter();
  const [actionType, setActionType] = useState("password");

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  

  const handleLogin = () => {
    setLoading(true);
    postFetch("/authentication/login", {
      email: user.email.toLowerCase(),
      password: user.password,
    })
      .then((response: any) => {
        setLoading(false);
        // console.log(response.response.data.message);

        // console.log("response.data.role",response)
        if (response.data.role) {
          dispatch(setUserss(response.data));
          if (response?.data?.status === "unapproved") {
            toast("Please wait for approval", {
              theme: "dark",
            });
          } else {
            if (response?.data?.role === "superuser") {
              router.push(`/individuals`); 
              toast("Login Successfull", {
                theme: "dark",
              });
            } else {
              router.push(`/dashboard/${response?.data?._id}`);
              toast("Login Successfull", {
                theme: "dark",
              });
            }
          }
        } else {
          toast("Invalid Email or Password", {
            theme: "dark",
          });
        }
       
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
          <h1 className="md:text-3xl text-2xl font-bold">
            Welcome to K.O.L.C.I.C.S
          </h1>
          <h1 className="md:text-xl text-lg font-semibold mt-4">
            Login to your Account
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
              <label htmlFor="" className="text-sm">
                Password
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
                  placeholder="Password"
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

            <div className="flex justify-between items-center mt-2">
              <Link
                href="/forgot"
                className="text-purple-900 font-semibold text-xs"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
