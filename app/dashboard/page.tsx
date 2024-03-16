"use client";
import React, { useEffect, useState } from "react";
import { getFetch } from "../lib/apiCall";
import { NextUIProvider } from "@nextui-org/react";
import IndividualPaymentTable from "./table";

const page = () => {
  
  const [allUsers, setAllUsers] = useState<any>([]);
  let [isOpen, setIsOpen] = useState<any>(false);

  useEffect(() => {
    getFetch(`/individuals/get-single-individuals/`).then((response: any) => {
      setAllUsers(response?.data?.users);
    });
  }, []);

  return (
    <div className="w-10/12 p-6">
      {/* <NextUIProvider>
        <IndividualPaymentTable isOpen={isOpen} setIsOpen={setIsOpen} />
      </NextUIProvider> */}
    </div>
  );
};

export default page;
