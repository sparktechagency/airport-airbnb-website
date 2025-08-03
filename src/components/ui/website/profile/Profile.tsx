"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import BookingHistory from "./BookingHistory";
import ChatPage from "./ChatPage";
import ListingHistory from "./ListingHistory";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { LuCalendarClock, LuList, LuUserRound } from "react-icons/lu";
import { RiRotateLockLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";


const Profile = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(tabParam || "1");
  const profile = {
    name: "mithila",
    email: "mithilakhan082@gmail.com",
    role: "host"
  }
  const userRole = profile?.role;

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const tabs = [
    { id: "1", label: "Profile Details", icon: <p> <LuUserRound size={22} /> </p>, component: <ProfileDetails /> },
    { id: "2", label: "Change Password", icon: <p> <RiRotateLockLine size={22} /> </p>, component: <ChangePassword /> },
    { id: "3", label: "Booking History", icon: <p> <LuCalendarClock size={22} /> </p>, component: <BookingHistory /> },
    ...(userRole === "host"
      ? [{ id: "4", label: "Listing History", icon: <p> <LuList size={22} /> </p>, component: <ListingHistory /> }]
      : []),
    { id: "7", label: "Chat", icon: <p> <TiMessages size={22} /> </p>, component: <ChatPage /> },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-1/4 h-[calc(100vh-180px)] bg-[#fafbfc] rounded-xl p-5 shadow">
          <div className=" flex flex-col gap-1 items-center py-5">
            <div className="w-[94px] h-[94px] relative">
              <Image
                src="/user.png"
                alt="user image"
                fill
                className="rounded-full "
              />
            </div>
            <p className="text-2xl font-normal "> Jeson Willium </p>
            <p className="text-sm font-normal text-[#767676] "> Jeson Willium </p>
          </div>
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-4 cursor-pointer ${activeTab === tab.id
                  ? "bg-primary text-white shadow"
                  : "bg-white text-[#6B6B6B] hover:bg-primary hover:text-white"
                  }`}
              >
                <p> {tab.icon} </p> <p> {tab.label} </p>
              </div>
            ))}
            <div className="text-[#6B6B6B] text-left px-4 py-2 font-medium flex items-center gap-1 cursor-pointer " onClick={() => router.push("/login")} > <p> <IoIosLogOut size={22} /> </p> <p>  Log Out </p>
            </div>
          </div>
        </div>

        {/* Component Display */}
        <div className="w-full lg:w-3/4 bg-white rounded-xl p-7 shadow overflow-y-auto">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default Profile;