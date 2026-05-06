"use client";
import { MdGroup, MdLogout } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "@/redux/store";
import { setUserss } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";

const Sidebar = ({ menu, setMenu }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const user: any = useAppSelector((state) => state.user);
  const userData = user?.user;
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  // Only render user-specific content after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(setUserss({}));
    router.push(`/login`);
    router.refresh();
  };

  const navItems = [
    ...(userData?.role !== "member"
      ? [{ href: "/individuals", label: "Members", icon: MdGroup }]
      : []),
    ...(userData?.role === "superuser"
      ? [{ href: "/superuser", label: "Admin Panel", icon: RiShieldUserFill }]
      : []),
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  // Shared avatar initial — only shown after mount to avoid hydration mismatch
  const avatarLetter = mounted
    ? (userData?.firstname?.[0]?.toUpperCase() ?? "?")
    : "?";

  const fullName = mounted
    ? `${userData?.firstname ?? ""} ${userData?.lastname ?? ""}`.trim()
    : "";

  const role = mounted ? (userData?.role ?? "member") : "member";

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-[240px] bg-[#1a1433] flex-col justify-between z-40">

        {/* Top — Logo */}
        <div>
          <div className="px-6 pt-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-[#534AB7] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 3L4 8v6c0 5.25 4.27 10.16 10 11.33C19.73 24.16 24 19.25 24 14V8L14 3z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <div>
                <h1
                  className="text-white font-semibold text-[17px] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  K.O.L.
                </h1>
                <p className="text-white/50 text-[11px] leading-tight">
                  Cooperative Society
                </p>
              </div>
            </div>
          </div>

          {/* User pill */}
          <div className="px-4 py-4 border-b border-white/10">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5">
              <div className="w-8 h-8 rounded-full bg-[#534AB7] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
                {avatarLetter}
              </div>
              <div className="min-w-0">
                <p className="text-white text-[13px] font-medium truncate">
                  {fullName || "—"}
                </p>
                <p className="text-white/40 text-[11px] capitalize truncate">
                  {role}
                </p>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="px-4 pt-4 flex flex-col gap-1">
            <p className="text-white/30 text-[11px] uppercase tracking-widest px-2 mb-2">
              Navigation
            </p>
            {mounted && navItems.map(({ href, label, icon: Icon }) => (
            <a
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                  isActive(href)
                    ? "bg-[#534AB7] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="text-[18px] shrink-0" />
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom — Logout */}
        <div className="px-4 pb-8">
          <div className="h-px bg-white/10 mb-4" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer"
          >
            <MdLogout className="text-[18px] shrink-0" />
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Mobile Top Bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a1433] border-b border-white/10 h-16 flex items-center justify-between px-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#534AB7] flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 3L4 8v6c0 5.25 4.27 10.16 10 11.33C19.73 24.16 24 19.25 24 14V8L14 3z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </div>
          <h1
            className="text-white font-semibold text-[16px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            K.O.L. Cooperative
          </h1>
        </div>

        {/* Right side — nav + logout */}
        <div className="flex items-center gap-1">
          {mounted && navItems.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                isActive(href)
                  ? "bg-[#534AB7] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="text-[16px]" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all ml-1"
          >
            <MdLogout className="text-[16px]" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;