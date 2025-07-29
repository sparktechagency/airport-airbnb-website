"use client";

import { useState, useRef, useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import { LiaUserCircleSolid } from "react-icons/lia";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "antd";
import NavbarMobile from "./NavbarMobile";

// Define types for nav options and user
interface NavOption {
  label: string;
  path: string;
}

interface User {
  name: string;
  image: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const user: User | null = {
    name: "John Doe",
    image: "/user.png",
  };

  const navOptions: NavOption[] = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Support", path: "/support" },
  ];

  // Close menu on route change
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
          <Badge count={2} color="#083a65">
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
          {user ? (
            <div className="flex flex-row items-center gap-4">

              <Link href="/saved-item"  className="cursor-pointer">
                <Badge count={2} color="#083a65"  >
                  <LuHeart size={26} color="#767676" />
                </Badge>
              </Link> 

              <Link
                href="/account-information"
                className="flex items-center gap-2 h-[55px] px-2 rounded-md cursor-pointer transition"
              >
                <Image
                  src={user.image}
                  alt="User Profile"
                  width={44}
                  height={44}
                  className="rounded-full h-11 w-11 object-cover cursor-pointer"
                />
              </Link>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              aria-label="Login"
            >
              <LiaUserCircleSolid size={28} color="#767676" />
            </button>
          )}
          <button
            className="text-[14px] py-3 px-4 rounded-lg font-medium bg-primary text-white"
            onClick={() => router.push("/select-service")}
          >
            Be a Host
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <NavbarMobile
        drawerVisible={drawerVisible}
        navOptions={navOptions}
        setDrawerVisible={setDrawerVisible}
        pathname={pathname}
      />
    </div>
  );
};

export default Navbar;