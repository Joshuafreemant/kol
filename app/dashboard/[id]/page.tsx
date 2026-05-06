// page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { getFetch } from "@/app/lib/apiCall";
import IndividualPaymentTable from "../table";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

const Page = ({ params }: any) => {
  const [allRecords, setAllRecords] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isDelOpen, setIsDelOpen] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userData: any = useAppSelector((state) => state.user);
  const user = userData?.user;
  const id = params?.id;

  useEffect(() => {
    getFetch(`/individuals/${id}`).then((response: any) => {
      setAllRecords(response?.data?.data);
       setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user?.role === "member" || user?.role === "superuser") {
      router.push(`/dashboard/${params?.id}`);
      router.refresh();
    } else {
      router.push(`/login`);
      router.refresh();
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f5f4f9] font-sans">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 mb-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-[22px] font-semibold text-[#1a1a2e]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Member Dashboard
          </h1>
          <p className="text-[14px] text-gray-500 mt-8 lg:mt-0.5">
            Payment records and account balances
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10">
  {loading ? (
    // Still fetching
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-gray-200">
      <Image src="/spinner.gif" alt="loading" width={64} height={64} />
      <p className="text-[14px] text-gray-400">
        Loading records, please wait...
      </p>
    </div>
  ) : allRecords?.length === 0 ? (
    // Fetched but no data
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-gray-200">
      <div className="w-16 h-16 rounded-full bg-[#f5f4f9] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-[15px] font-medium text-gray-700 mb-1">
          No payment records yet
        </p>
        <p className="text-[13px] text-gray-400">
          Payment records for this member will appear here once added.
        </p>
      </div>
    </div>
  ) : (
    // Has data
    <NextUIProvider>
      <IndividualPaymentTable
        record={allRecords}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsDelOpen={setIsDelOpen}
        isDelOpen={isDelOpen}
      />
    </NextUIProvider>
  )}
</div>
    </div>
  );
};

export default Page;