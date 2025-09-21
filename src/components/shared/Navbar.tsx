"use client";

import { useState, useRef, useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
// import { LiaUserCircleSolid } from "react-icons/lia";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "antd";
import NavbarMobile from "./NavbarMobile";
import getProfile from "@/helpers/getProfile";
import { imgUrl } from "@/config/config";
import { FavoriteItemLength } from "../ui/website/home/FavoriteItemLength";

// Define types for nav options and user
interface NavOption {
  label: string;
  path: string;
}

interface UserProfileType {
  _id: string;
  name: string;
  profilePic: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfileType | null>(null);
  const userType = localStorage.getItem("userType")
  const [count, setCount] = useState(0);
console.log(count);
  useEffect(() => {
    const fetchCount = async () => {
      const len = await FavoriteItemLength();
      setCount(len);
    };
    fetchCount();
  }, []);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);


  const navOptions: NavOption[] = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Support", path: "/support" },
    { label: "Airport Info", path: "/airport-info" },
    { label: "Track My Flight", path: "https://www.flightaware.com/" },

  ];


  useEffect(() => {
    setIsMenuOpen(false);
    setDrawerVisible(false);
  }, [pathname]);

  // Handle click outside for desktop menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full z-50 bg-white/90 border-b border-gray-200">
      <div className="navbar flex h-[96px] container justify-between lg:items-center items-center relative lg:px-1 ">
        {/* Logo */}
        <img
          src="/airbnb-logo.png"
          alt="Airbnb Logo"
          onClick={() => router.push("/")}
          className="w-16 h-16 object-fill cursor-pointer"
        />

        {/* Nav Menu for Large Devices */}
        <div
          ref={menuRef}
          className={`w-full lg:w-auto lg:flex flex-col lg:flex-row lg:px-6 lg:space-x-6 text-[16px] ${isMenuOpen ? "block" : "hidden"}`}
        >
          {navOptions.map((option) => {
            const isActive = pathname === option.path;
            return (
              <Link
                key={option.path}
                href={option.path}
                className={`nav-link flex flex-col items-center justify-center text-[16px] px-3 py-[14px] rounded-lg cursor-pointer ${isActive ? "text-primary font-semibold" : "text-[#767676]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {option.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-8">
          <Badge count={count} color="#083a65">
            <LuHeart size={26} color="#767676" />
          </Badge>
          <button
            className="z-50 pb-2"
            onClick={() => setDrawerVisible(true)}
            aria-label="Toggle mobile menu"
          >
            <HiOutlineMenuAlt2 size={30} className="text-gray-600 cursor-pointer" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="nav-icons hidden lg:flex items-center gap-x-4">
          {user?._id ? (
            <div className="flex flex-row items-center gap-4">

              <Link href="/saved-item" className="cursor-pointer">
                <Badge count={count} color="#083a65"  >
                  <LuHeart size={26} color="#767676" />
                </Badge>
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-2 h-[55px] px-2 rounded-md cursor-pointer transition"
              >
                <Image
                  src={user?.profilePic?.startsWith("https") ? user?.profilePic : `${imgUrl}${user?.profilePic}`}
                  alt="User Profile"
                  width={44}
                  height={44}
                  className="rounded-full h-11 w-11 object-cover cursor-pointer"
                />
              </Link>
            </div>
          ) : (
            <button

              aria-label="Login"
              className=" flex items-center gap-2 text-primary font-medium text-sm"
            >
              {/* <LiaUserCircleSolid size={28} color="#767676" /> */}
              <span onClick={() => router.push("/login")} className=" pe-2 border-e-2 border-gray-300 cursor-pointer"> Sign In </span> <span onClick={() => router.push("/register")} className=" cursor-pointer">Sign Up</span>
            </button>
          )}

          {
            userType ?

              userType === "host" ?
                <button
                  className="text-[14px] py-3 px-4 rounded-lg font-medium bg-primary text-white"
                  onClick={() => localStorage.setItem("userType", "guest")}
                >
                  Switch to guest
                </button>
                :
                <button
                  className="text-[14px] py-3 px-4 rounded-lg font-medium bg-primary text-white"
                  onClick={() => router.push("/be-a-host")}
                >
                  Be a Host
                </button>
              :
              <button
                className="text-[14px] py-3 px-4 rounded-lg font-medium bg-primary text-white"
                onClick={() => router.push("/be-a-host")}
              >
                Be a Host
              </button>
          }

        </div>
      </div>

      {/* Mobile Drawer */}
      <NavbarMobile
        drawerVisible={drawerVisible}
        navOptions={navOptions}
        setDrawerVisible={setDrawerVisible}
        pathname={pathname}
        router={router}
      />
    </div>
  );
};

export default Navbar;