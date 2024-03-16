"use client";
import React, { useEffect, useState } from "react";
// import { getFetch } from "../lib/apiCall";
import { NextUIProvider } from "@nextui-org/react";
import { getFetch } from "@/app/lib/apiCall";
import IndividualPaymentTable from "../table";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
// import IndividualPaymentTable from "./table";

const page = ({ params }: any) => {
  const [allRecords, setAllRecords] = useState<any>([]);
  let [isOpen, setIsOpen] = useState<any>(false);
  let [isDelOpen, setIsDelOpen] = useState<any>(false);
  const router = useRouter();

  const userData: any = useAppSelector((state) => state.user);
  const user = userData?.user;

  const id = params?.id;
  useEffect(() => {
    getFetch(`/individuals/${id}`).then((response: any) => {
      setAllRecords(response?.data?.data);
      // console.log("response?.data?.data", response?.data?.data);
    });
  }, []);

  useEffect(() => {
    if (user?.role === "member" || user?.role === "superuser") {
      router.push(`/dashboard/${params?.id}`);
    } else {
      router.push(`/login`);
    }
  }, []);

  return (
    <div className="w-full p-2 lg:p-6">
      <NextUIProvider>
        {/* {!allRecords?.length ? (
          <div className=" w-full h-[90vh] flex items-center justify-center">
            <Image src={"/spinner.gif"} alt="loading" width={80} height={80} />
          </div>
        ) : ( */}
          <IndividualPaymentTable
            record={allRecords}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsDelOpen={setIsDelOpen}
            isDelOpen={isDelOpen}
          />
        {/* )} */}
      </NextUIProvider>
    </div>
  );
};

export default page;
