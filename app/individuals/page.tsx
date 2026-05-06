"use client";
import React, { useEffect, useState } from "react";
import { getFetch } from "../lib/apiCall";
import IndividualTables from "./table";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setAllUser } from "@/redux/slices/userSlice";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user: any = useAppSelector((state) => state.user);
  const [userss, setUsersss] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.user?.role === "superuser") {
      router.push(`/individuals`);
      router.refresh();
    } else {
      router.push(`/login`);
      router.refresh();
    }
  }, []);

  useEffect(() => {
    getFetch(`/individuals/get-all-individuals/${1}`).then((response: any) => {
      const filtered = response?.data?.users.filter(
        (data: any) => data.role !== "superuser"
      );
      dispatch(setAllUser(filtered));
      setUsersss(filtered);
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f5f4f9] font-sans">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1
              className="text-[22px] font-semibold text-[#1a1a2e]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Members Directory
            </h1>
            <p className="text-[14px] text-gray-500 mt-0.5">
              Manage and review all cooperative members
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3C3489] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 3L4 8v6c0 5.25 4.27 10.16 10 11.33C19.73 24.16 24 19.25 24 14V8L14 3z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Members",
              value: userss?.length ?? 0,
              color: "bg-[#3C3489]",
            },
            {
              label: "Approved",
              value:
                userss?.filter((u: any) => u.status === "approved").length ?? 0,
              color: "bg-green-600",
            },
            {
              label: "Pending Approval",
              value:
                userss?.filter((u: any) => u.status !== "approved").length ?? 0,
              color: "bg-amber-500",
            },
            {
              label: "Admins",
              value:
                userss?.filter((u: any) => u.role === "admin").length ?? 0,
              color: "bg-[#534AB7]",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 px-5 py-4"
            >
              <p className="text-[13px] text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${stat.color}`} />
                <p className="text-[24px] font-semibold text-[#1a1a2e]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table area */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_2px_12px_rgba(60,52,137,0.06)] overflow-hidden">

          {!userss?.length ? (
            <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4">
              <Image src="/spinner.gif" alt="loading" width={64} height={64} />
              <p className="text-[14px] text-gray-400">
                Loading members, please wait...
              </p>
            </div>
          ) : (
            <div className="p-6">
              <NextUIProvider>
                <IndividualTables
                  allUsers={userss}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </NextUIProvider>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Page;