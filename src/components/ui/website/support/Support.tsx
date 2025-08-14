
import Heading from "@/components/shared/Heading";
import { Mailbox } from "lucide-react";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuPhoneCall } from "react-icons/lu";
import Faq from "../faq/FAQ";

const Support = () => {
  return (
    <div className="bg-[#E6F2F5] lg:pt-20 pt-14">
      {/* heading  */}
      <Heading style="font-normal lg:text-[32px] text-2xl leading-[48px] text-[#3E3E3E] text-center mb-10">
        We Are Here
        <span className="text-primary">To Help You</span>
      </Heading>

      {/* contact option */}
      <div className="container   grid lg:grid-cols-3 grid-cols-1 gap-6 items-center justify-items-center pb-20">
        <div className="relative bg-white group w-[339px] lg:h-[220px] h-[160px] rounded-2xl mx-auto flex items-center justify-center">
          {/* float icon */}
          <div className="bg-[#E6F2F5]  p-3 absolute lg:-left-16 -left-14 top-8 rounded-full">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="lg:w-20 w-16 lg:h-20 h-16 flex items-center justify-center rounded-full bg-primary p-2">
                <FaMapLocationDot
                  size={40}
                  color="white"
                  className="group-hover:scale-110 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* info container */}
          <div>
            <Heading
              name="Location"
              style="font-medium lg:text-[24px] text-xl leading-[29px] text-primary"
            />
            <p className="text-[#767676] text-[14px] leading-[21px] font-normal">
              4400 State Hwy 121, Suite 300<br />
              Lewisville, TX 75056
            </p>
          </div>
        </div>

        <div className="relative bg-white w-[339px] group lg:h-[220px] h-[160px] rounded-2xl mx-auto flex items-center justify-center">
          {/* float icon */}
          <div className="bg-[#E6F2F5] p-3 absolute lg:-left-20 -left-14 top-8 rounded-full">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="lg:w-20 w-16 lg:h-20 h-16 flex items-center justify-center rounded-full bg-secondary p-2">
                <Mailbox
                  size={45}
                  color="white"
                  className="group-hover:scale-110 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* info container */}
          <div className="">
            <Heading
              name="Email"
              style="font-medium lg:text-[24px] text-xl leading-[29px] text-primary ms-6"
            />
            <p className='text-[#767676] text-[14px] leading-[21px] font-normal ms-6'>
              <a href='mailto:info@FlightDelayStays.com' className='text-[#7676761]'>info@FlightDelayStays.com</a><br />
              <a href='mailto:customercare@FlightDelayStays.com' className='text-[#7676761]'>customercare@FlightDelayStays.com</a>
            </p>
          </div>
        </div>

        <div className="relative group bg-white w-[339px] lg:h-[220px] h-[160px] rounded-2xl mx-auto flex items-center justify-center">
          {/* float icon */}
          <div className="bg-[#E6F2F5] p-3 absolute lg:-left-16 -left-14 top-8 rounded-full">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="lg:w-20 w-16 lg:h-20 h-16 flex items-center justify-center rounded-full bg-[#00B047] p-2">
                <LuPhoneCall
                  size={40}
                  color="white"
                  className="group-hover:scale-110 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* info container */}
          <div>
            <Heading
              name="Get In Touch!"
              style="font-medium lg:text-[24px] text-xl leading-[29px] text-primary"
            />
            <p className="text-[#767676] text-[14px] leading-[21px] font-normal">
              1-877-489-9689 EXT 7
            </p>
          </div>
        </div>
      </div>

      {/* faq section */}
      <div className="bg-white pt-20">
        <Faq />
      </div>
    </div>
  );
};

export default Support;