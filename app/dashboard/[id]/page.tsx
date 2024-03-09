"use client";
import React, { useEffect, useState } from "react";
// import { getFetch } from "../lib/apiCall";
import { NextUIProvider } from "@nextui-org/react";
import { getFetch } from "@/app/lib/apiCall";
import IndividualPaymentTable from "../table";
import { useRouter } from "next/navigation";
// import IndividualPaymentTable from "./table";

const page = ({ params }: any) => {
  const [allRecords, setAllRecords] = useState<any>([]);
  let [isOpen, setIsOpen] = useState<any>(false);
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

  useEffect(() => {
    getFetch(`/individuals/${params?.id}`).then((response: any) => {
      setAllRecords(response?.data?.data);
      console.log(response?.data?.data);
    });
  }, []);

  useEffect(() => {
    if (userData?.role === "member" || userData?.role === "superuser") {
      router.push(`/dashboard/${params?.id}`);
    } else {
      router.push(`/login`);
    }
  }, []);

  return (
    <div className="w-full p-2 lg:p-6">
      <NextUIProvider>
        {allRecords?.length ? (
          <IndividualPaymentTable
            record={allRecords}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ) : (
          "Loading"
        )}
      </NextUIProvider>
    </div>
  );
};

export default page;
