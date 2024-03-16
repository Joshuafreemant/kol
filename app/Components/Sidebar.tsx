"use client";
import Link from "next/link";
import { MdGroup } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { postFetch } from "../lib/apiCall";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

const Sidebar = ({ menu, setMenu }: any) => {
  const router = useRouter();
  const user:any = useAppSelector((state) => state.user)
  const userData=user?.user


  

  const handleLogout = () => {
    // window.localStorage.removeItem("kol_user");
    router.push(`/login`);
  };
  return (
    <>
      <div className="hidden h-screen fixed w-2/12 bg-purple-900 pt-1 md:flex flex-col justify-between">
        <div className="mt-12">
          <div className=" text-white flex flex-col items-start px-6">
            <h1 className="font-bold text-5xl ">KOL</h1>
            <h2>Cooperative Society</h2>
          </div>
          <div className="flex flex-col gap-3 text-white mt-12 px-6">
            {userData?.role === "member" ? (
              <Link
                href={`/dashboard/${userData?._id}`}
                className="flex items-center gap-3"
              >
                <MdGroup />
                My Account
              </Link>
            ) : (
              <Link href="/individuals" className="flex items-center gap-3">
                <MdGroup />
                Individuals
              </Link>
            )}

            {/* <Link
            href="/users/[id]"
            as="/users/123"
            className="flex items-center gap-3"
          >
            <RiAdminFill />
            Management
          </Link> */}
          </div>
        </div>

        <div
          onClick={() => handleLogout()}
          className="flex items-center gap-3 text-white mb-12 px-6"
        >
          <RiAdminFill />
          <label className="flex items-center ">Logout</label>
        </div>
      </div>

      <div className="flex md:hidden  justify-between w-full fixed h-20 text-white bg-purple-900 items-center px-6">
        <div className=" text-white flex flex-col items-start  ">
          <h1 className="font-bold text-3xl ">KOL</h1>
          {/* <h2>Cooperative Society</h2> */}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1 text-white">
            {userData?.role === "member" ? (
              <Link
                href={`/dashboard/${userData?._id}`}
                className="flex items-center gap-3"
              >
                <MdGroup />
                My Account
              </Link>
            ) : (
              <Link href="/individuals" className="flex items-center gap-3">
                <MdGroup />
                Individuals
              </Link>
            )}

            {/* <Link
            href="/users/[id]"
            as="/users/123"
            className="flex items-center gap-3"
          >
            <RiAdminFill />
            Management
          </Link> */}
          </div>

          <div
            onClick={() => handleLogout()}
            className="flex items-center gap-1 text-white cursor-pointer "
          >
            <RiAdminFill />
            <label className="flex items-center ">Logout</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
