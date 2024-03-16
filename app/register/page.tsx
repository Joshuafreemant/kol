"use client";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { postFetch } from "../lib/apiCall";
import { User } from "./types";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const register = () => {
  const [actionType, setActionType] = useState("password");
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
      password: user.password,
      phone_number: user.phone_number,
    })
      .then((response: any) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <ToastContainer />

    <div className="w-full h-screen flex items-center justify-center">
      <div className="px-12 md:px-0 w-full md:w-5/12  lg:w-4/12 lg:-ml-[240px]">
      <h1 className="md:text-3xl text-2xl font-bold">Welcome to K.O.L.C.I.C.S</h1>
        <h1 className="text-xl font-semibold mt-4">Create Account</h1>
        <form className="border border-gray-300 p-6 rounded mt-4 w-full">
          <div className="flex items-center gap-2  w-full">
            <div className="flex flex-col w-1/2">
              <label htmlFor="">Firstname</label>
              <input
                type="text"
                onChange={(e:any) =>
                  setUser({
                    ...user,
                    firstname: e.target.value,
                  })
                }
                placeholder="Firstname"
                className="w-full text-sm p-2 rounded outline-none border border-gray-300"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="">Lastname</label>
              <input
                type="text"
                onChange={(e:any) =>
                  setUser({
                    ...user,
                    lastname: e.target.value,
                  })
                }
                placeholder="Lastname"
                className="w-full text-sm p-2 rounded outline-none border border-gray-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="" className="text-sm">
              Email Address
            </label>
            <input
              type="email"
              required
              onChange={(e:any) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              placeholder="Email Address"
              className="text-sm p-2 rounded outline-none border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="" className="text-sm">
              Phone Number
            </label>
            <input
              type="text"
              onChange={(e:any) =>
                setUser({
                  ...user,
                  phone_number: e.target.value,
                })
              }
              placeholder="Phone Number"
              className="text-sm p-2 rounded outline-none border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="" className="text-sm">
              Password
            </label>

            <div className="rounded outline-none border border-gray-300 flex items-center">
              <input
                type={actionType}
                onChange={(e:any) =>
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
                onClick={() => handleRegister()}
              >
                Submit
              </button>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold text-xs">Already Registered? </p>
            <Link href="/login" className="text-purple-900 font-semibold text-xs">Login</Link>
          </div>
        </form>
      </div>
    </div></>
  );
};

export default register;
