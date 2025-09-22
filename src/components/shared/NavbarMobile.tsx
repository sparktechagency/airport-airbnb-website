/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IoCloseSharp } from "react-icons/io5";
import { Drawer, Dropdown, Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";
import getProfile from "@/helpers/getProfile";
import { imgUrl } from "@/config/config";
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

const NavbarMobile = ({
    drawerVisible,
    navOptions,
    setDrawerVisible,
    pathname,
    router,
}: {
    drawerVisible: boolean;
    navOptions: NavOption[];
    setDrawerVisible: (open: boolean) => void;
    pathname: string;
    router: AppRouterInstance;
}) => {
    const [user, setUser] = useState<UserProfileType | null>(null);
    const userType = getCookieValue("userType");

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
        <Drawer
            title={
                <div className="flex items-center justify-between">
                    <img
                        src="/airbnb-logo.png"
                        alt=""
                        className="w-12 h-12 object-fill"
                        onClick={() => {
                            setDrawerVisible(false);
                            router.push("/");
                        }}
                    />
                    <IoCloseSharp
                        onClick={() => setDrawerVisible(false)}
                        size={20}
                        color="#fff"
                        className="cursor-pointer"
                    />
                </div>
            }
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width="90%"
            style={{ backgroundColor: "#202020" }}
            className="relative"
        >
            <div className="flex flex-col">
                {/* Nav Links */}
                <div className="flex flex-col">
                    {navOptions.map((option) => {
                        const isActive = pathname === option.path;

                        if (option.children) {
                            const menuItems = (
                                <Menu
                                    items={option.children.map((child) => ({
                                        key: child.path,
                                        label: (
                                            <Link
                                                href={child.path}
                                                onClick={() => setDrawerVisible(false)}
                                            >
                                                {child.label}
                                            </Link>
                                        ),
                                    }))}
                                />
                            );

                            return (
                                <Dropdown
                                    key={option.label}
                                    overlay={menuItems}
                                    trigger={["click"]}
                                    placement="bottomLeft"
                                >
                                    <span
                                        className={`py-4 text-[16px] font-normal cursor-pointer border-b border-[#4E4E4E] ${isActive ? "text-white" : "text-white/60"
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
                                href={option.path ?? "/"}
                                onClick={() => setDrawerVisible(false)}
                            >
                                <div
                                    className={`py-4 text-[16px] font-normal cursor-pointer border-b border-[#4E4E4E] ${isActive ? "text-white" : "text-white/60"
                                        }`}
                                >
                                    {option.label}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Section */}
                <div className="absolute bottom-6 w-[90%]">
                    <div className="w-full flex flex-col gap-4">



                        {/* User profile / login */}
                        {user?._id ? (
                            <div className=" flex flex-col gap-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setDrawerVisible(false)}
                                    className="flex items-center justify-center gap-2 h-[48px] px-2 cursor-pointer transition border border-white rounded-full"
                                >
                                    <Image
                                        src={
                                            user?.profilePic?.startsWith("https")
                                                ? user?.profilePic
                                                : `${imgUrl}${user?.profilePic}`
                                        }
                                        alt="User Profile"
                                        width={40}
                                        height={40}
                                        className="rounded-full h-10 w-10 object-cover cursor-pointer"
                                    />
                                    <h2 className="text-[16px] font-medium text-white text-center ">
                                        {user?.name}
                                    </h2>
                                </Link>
                                {/* Host / Guest toggle */}
                                {userType ? (
                                    <button
                                        className="text-[16px] py-3 w-full rounded-full font-medium text-[#070707] bg-white"
                                        onClick={() => {
                                            setDrawerVisible(false);
                                            switchToHost();
                                        }}
                                    >
                                        {userType === "host" ? "Switch to guest" : "Be a Host"}
                                    </button>
                                ) : (
                                    <button
                                        className="text-[16px] py-3 w-full rounded-full font-medium text-[#070707] bg-white"
                                        onClick={() => {
                                            setDrawerVisible(false);
                                            switchToHost();
                                        }}
                                    >
                                        Be a Host
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-4 text-white">
                                <span
                                    className="cursor-pointer border-e-2 border-white pr-4"
                                    onClick={() => {
                                        setDrawerVisible(false);
                                        router.push("/login");
                                    }}
                                >
                                    Sign In
                                </span>
                                <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setDrawerVisible(false);
                                        router.push("/register");
                                    }}
                                >
                                    Sign Up
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default NavbarMobile;
