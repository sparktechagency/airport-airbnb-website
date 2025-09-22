"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import BookingHistory from "./BookingHistory";
import ListingHistory from "./ListingHistory";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { LuCalendarClock, LuList, LuUserRound } from "react-icons/lu";
import { RiRotateLockLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import ChatPage from "./chat/ChatPage";
import { IUser } from "@/types/profile/userType";
import { imgUrl } from "@/config/config";
import HostBookingHistory from "./HostBokkingHistory";
import { CiBank } from "react-icons/ci";
import VerifyBankAccount from "../steps-of-host/VerifyBankAccount";
import { FaEdit } from "react-icons/fa";
import { myFetch } from "@/helpers/myFetch";
import { revalidateTags } from "@/helpers/revalidateTags";
import { BsCash } from "react-icons/bs";
import SubscriptionPage from "./SubscriptionPage";
import Cookies from "js-cookie";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Profile = ({user,chatLists}:{user:IUser,chatLists:any}) => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(tabParam || "1");
  const userRole = localStorage.getItem("userType")

  async function changeProfilePic(file: File) {
    const formData = new FormData();
    formData.append("profilePic", file);

    const res = await myFetch("/user", {
      method: "PATCH",
      body: formData,
    });
    // console.log(res);
    
    if (res?.success) {
      revalidateTags(["user-profile"]);
    }
  }

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  // console.log(user);
  

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/profile?tab=${tabId}`, { scroll: false });
  };

  const tabs = [
    { id: "1", label: "Profile Details", icon: <p> <LuUserRound size={22} /> </p>, component: <ProfileDetails user={user} /> },
    { id: "2", label: "Change Password", icon: <p> <RiRotateLockLine size={22} /> </p>, component: <ChangePassword /> },
    { id: "3", label: "Booking History", icon: <p> <LuCalendarClock size={22} /> </p>, component: userRole === "host" ? <HostBookingHistory /> : <BookingHistory /> },
    { id: "5", label: "Subscription", icon: <p> <BsCash size={22} /> </p>, component:  <SubscriptionPage/> },
    ...(userRole === "host"
      ? [{ id: "4", label: "Listing History", icon: <p> <LuList size={22} /> </p>, component: <ListingHistory /> }]
      : []),
    { id: "7", label: "Chat", icon: <p> <TiMessages size={22} /> </p>, component: <ChatPage chatData={chatLists} /> },
   ...(userRole === "host"
      ? [{ id: "8", label: "Billing", icon: <p> <CiBank size={22} /> </p>, component: <div className="p-7 flex justify-center items-center  top-0 left-0 w-full h-full"> <VerifyBankAccount /> </div> }]
      : [])
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:h-[calc(100vh-90px)]"> 


        {/* Sidebar Tabs */}
        <div className="w-full lg:w-1/4  bg-[#fafbfc] rounded-xl p-5 shadow">
          <div className=" flex flex-col gap-1 items-center py-5">
            <div className="w-[94px] h-[94px] relative">
              <Image
                src={user?.profilePic ? `${imgUrl}${user?.profilePic}` : "https://tse3.mm.bing.net/th/id/OIP.9PPdes_WSxaqUQJxWab16AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"}
                alt="user image"
                fill
                className="rounded-full "
              />
              <div>
                <div className="absolute w-full h-full bg-black/30 rounded-full">
                <button className="w-full h-full rounded-full">
                  <input type="file" name="file" hidden  id="image-file" onChange={(e) => changeProfilePic(e.target.files![0])} />
                  <label htmlFor="image-file" className="w-full h-full flex items-center justify-center cursor-pointer">
                    <FaEdit className="text-white m-auto block" size={20} />
                  </label>
                </button>
                </div>
              </div>
            </div>
            <p className="text-2xl font-normal "> {user?.name} </p>
            <p className="text-sm font-normal text-[#767676] "> {user?.email} </p>
          </div>
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-4 cursor-pointer ${activeTab === tab.id
                  ? "bg-primary text-white shadow"
                  : "bg-white text-[#6B6B6B] hover:bg-primary hover:text-white"
                  }`}
              >
                <p> {tab.icon} </p> <p> {tab.label} </p>
              </div>
            ))}
            <div className="text-[#6B6B6B] text-left px-4 py-2 font-medium flex items-center gap-1 cursor-pointer " onClick={() => {
              localStorage.clear();
              Cookies.remove("accessToken");
              router.push("/");
              window.location.reload();
            }} > <p> <IoIosLogOut size={22} /> </p> <p>  Log Out </p>
            </div>
          </div>
        </div>


        {/* Component Display */}
        <div className="w-full lg:w-3/4 bg-white rounded-xl h-auto shadow overflow-y-auto">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div> 

      </div>
    </div>
  );
};

export default Profile;