"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(`/login`);
    router.refresh();

  }, []);

  return <div className="flex items-center"></div>;
}
