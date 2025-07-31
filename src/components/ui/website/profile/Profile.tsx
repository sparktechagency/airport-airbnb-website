"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import BookingHistory from "./BookingHistory";
import ChatPage from "./ChatPage";
import ListingHistory from "./ListingHistory";


const Profile = () => { 
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "1"); 
  const profile = {
    name:"mithila" , 
    email:"mithilakhan082@gmail.com" ,
    role:"host"
  }
  const userRole = profile?.role; 

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const tabs = [
    { id: "1", label: "Edit Profile", component: <ProfileDetails /> },
    { id: "2", label: "Change Password", component: <ChangePassword /> },
    { id: "3", label: "Proposal List", component: <BookingHistory /> },
    ...(userRole === "host"
      ? [{ id: "4", label: "Upload Business", component: <ListingHistory /> }]
      : []),
    { id: "7", label: "Chat", component: <ChatPage /> },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-1/5 bg-[#f7e9d7] rounded-xl p-5 shadow">
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow"
                    : "bg-white text-[#6B6B6B] hover:bg-primary hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Component Display */}
        <div className="w-full lg:w-4/5 bg-white rounded-xl p-2 shadow">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default Profile;