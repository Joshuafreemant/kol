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

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user: any = useAppSelector((state) => state.user);
  const [userss, setUsersss] = useState([]);

  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.user?.role === "superuser") {
      router.push(`/individuals`);
    } else {
      router.push(`/login`);
    }
  }, []);

  useEffect(() => {
    getFetch(`/individuals/get-all-individuals`).then((response: any) => {
      dispatch(
        setAllUser(
          response?.data?.users.filter((data: any) => {
            return data.role !== "superuser";
          })
        )
      );
      setUsersss(
        response?.data?.users.filter((data: any) => {
          return data.role !== "superuser";
        })
      );
    });
  }, []);

  return (
    <div className="lg:w-full w-full p-3 md:p-6 mt-24 lg:mt-0 b">
      <NextUIProvider>
        {!userss?.length ? (
          <div className=" w-full h-[90vh] flex items-center justify-center">
            <Image src={"/spinner.gif" } alt="loading"  width={80} height={80}/>
            
          </div>
        ) : (
          <IndividualTables
            allUsers={userss}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )} 
      </NextUIProvider>
    </div>
  );
};

export default page;
