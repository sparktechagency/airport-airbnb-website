"use client";

import { useState, useRef, useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge, Dropdown, Menu } from "antd";
import NavbarMobile from "./NavbarMobile";
import getProfile from "@/helpers/getProfile";
import { imgUrl } from "@/config/config";
import { FavoriteItemLength } from "../ui/website/home/FavoriteItemLength";
import { getCookieValue, setCookie } from "@/helpers/cookieHelper";
import { myFetch } from "@/helpers/myFetch";

interface NavOption {
  label: string;
  path: string;
  children?: NavOption[];
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
  const userType = getCookieValue("userType");
  const [count, setCount] = useState(0);

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
    {
      label: "About Us",
      path: "/about",
      children: [
        { label: "Our Story", path: "/about" },
        { label: "Safety First", path: "/safety-first" },
      ],
    },
    { label: "Support", path: "/support" },
    { label: "Airport Info", path: "/airport-info" },
    { label: "Track My Flight", path: "https://www.flightaware.com/" },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
    setDrawerVisible(false);
  }, [pathname]);

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

  async function switchToHost() {
    if (userType === "host") {
      setCookie("userType", "guest");
      localStorage.setItem("userType", "guest");
      window.location.reload();
      return;
    }
    const res = await myFetch("/hotel", { method: "GET", cache: "no-store" });

    localStorage?.setItem("userType", "host");
    setCookie("userType", "host");

    if (!res?.data?.result?.length) {
      router.push("/be-a-host");
      return;
    }
    window.location.reload();
  }

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
          className={`w-full lg:w-auto lg:flex flex-col lg:flex-row items-center lg:px-6 lg:space-x-6 text-[16px] ${isMenuOpen ? "block" : "hidden"
            }`}
        >
          {navOptions.map((option) => {
            const isActive = pathname === option.path;

            if (option.children) {
              const menuItems = (
                <Menu
                  items={option.children.map((child) => ({
                    key: child.path,
                    label: <Link href={child.path}>{child.label}</Link>,
                  }))}
                />
              );

              return (
                <Dropdown
                  key={option.label}
                  overlay={menuItems}
                  trigger={["hover"]}
                  placement="bottom"
                >
                  <span
                    className={`nav-link flex items-center justify-center text-[16px] px-3 py-[14px] rounded-lg cursor-pointer ${isActive ? "text-primary font-semibold" : "text-[#767676]"
                      }`}
                  >
                    {option.label}
                  </span>
                </Dropdown>
              );
            }

            return (
              <Link
                key={option.path}
                href={option.path}
                className={`nav-link flex flex-col items-center justify-center text-[16px] px-3 py-[14px] rounded-lg cursor-pointer ${isActive ? "text-primary font-semibold" : "text-[#767676]"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {option.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle */}

        <div className="lg:hidden flex items-center gap-8">
          {
            user?._id && (
              <Badge count={count} color="#083a65">
                <LuHeart size={26} color="#767676" />
              </Badge>

            )
          }
          <button
            className="z-50 pb-2"
            onClick={() => setDrawerVisible(true)}
            aria-label="Toggle mobile menu"
          >
            <HiOutlineMenuAlt2
              size={30}
              className="text-gray-600 cursor-pointer"
            />
          </button>
        </div>


        {/* Right Icons */}
        <div className="nav-icons hidden lg:flex items-center gap-x-4">
          {user?._id ? (
            <div className="flex flex-row items-center gap-4">
              <Link href="/saved-item" className="cursor-pointer">
                <Badge count={count} color="#083a65">
                  <LuHeart size={26} color="#767676" />
                </Badge>
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-2 h-[55px] px-2 rounded-md cursor-pointer transition"
              >
                <Image
                  src={
                    user?.profilePic?.startsWith("https")
                      ? user?.profilePic
                      : `${imgUrl}${user?.profilePic}`
                  }
                  alt="User Profile"
                  width={44}
                  height={44}
                  className="rounded-full h-11 w-11 object-cover cursor-pointer"
                />
              </Link>

              {userType ? (
                userType === "host" ? (
                  <button
                    className="text-[14px] py-3 px-4 rounded-lg font-medium bg-primary text-white"
                    onClick={() => switchToHost()}
                  >
                    Switch to guest
                  </button>
                ) : (
                  <button
                    className="text-[14px] py-3 px-4 rounded-lg font-medium bg-primary text-white"
                    onClick={() => switchToHost()}
                  >
                    Be a Host
                  </button>
                )
              ) : (
                <button
                  className="text-[14px] py-3 px-4 rounded-lg font-medium bg-primary text-white"
                  onClick={() => switchToHost()}
                >
                  Be a Host
                </button>
              )}

            </div>
          ) : (
            <button
              aria-label="Login"
              className=" flex items-center gap-2 text-primary font-medium text-sm"
            >
              <span
                onClick={() => router.push("/login")}
                className=" pe-2 border-e-2 border-gray-300 cursor-pointer"
              >
                Sign In
              </span>{" "}
              <span
                onClick={() => router.push("/register")}
                className=" cursor-pointer"
              >
                Sign Up
              </span>
            </button>
          )}


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
