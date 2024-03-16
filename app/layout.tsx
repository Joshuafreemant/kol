"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Sidebar from "./Components/Sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "KOL Cooperative Society",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);

  return (
    <Providers>
      <html lang="en">
        <body className="flex gap-4">
          {pathname === "/" ||
          pathname.includes("login") ||
          pathname.includes("register") ||
          pathname.includes("forgot") ||
          pathname.includes("reset") ? (
            ""
          ) : (
            <Sidebar menu={menu} setMenu={setMenu} />
          )}
          <div className="lg:ml-[240px]  w-full">{children}</div>
        </body>
      </html>
      </Providers>
  );
}
