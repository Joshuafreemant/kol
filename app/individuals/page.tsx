"use client";
import React, { useEffect, useState } from "react";
import { getFetch } from "../lib/apiCall";
import IndividualTables from "./table";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      // Access localStorage safely
      const storedData:any = localStorage.getItem('kol_user');
      const stored=JSON.parse(storedData) || {}
      if (stored) {
        setUserData(stored);
      }
    }
  }, []); 

  const [allUsers, setAllUsers] = useState<any>([]);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getFetch(`/individuals/get-all-individuals`).then((response: any) => {
      setAllUsers(
        response?.data?.users.filter((data: any) => {
          return data.role !== "superuser";
        })
      );
    });
  }, []);
  useEffect(() => {
    if (userData?.role === "superuser") {
      router.push(`/individuals`);
    } else {
      router.push(`/login`);
    }
  }, []);

  return (
    <div className="lg:w-full w-full p-3 md:p-6 mt-24 lg:mt-0 b">
      <NextUIProvider>
        {allUsers?.length ? (
          <IndividualTables
            allUsers={allUsers}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ) : (
          "Loading..."
        )}
      </NextUIProvider>
    </div>
  );
};

export default page;
