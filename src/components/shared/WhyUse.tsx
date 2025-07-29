import React from 'react';
import Heading from './Heading';
import { Mailbox, ShieldCheck } from 'lucide-react';
import { RiRefund2Line } from 'react-icons/ri';

const WhyUse = () => {
    return (
         <div className="bg-[#F3F3F3] py-20 ">
      <Heading style="font-normal text-[32px] leading-[48px] text-[#3E3E3E] text-center">
        Why use <span className="text-primary">Airport Airbnb</span>
      </Heading>
      <div className="container  grid lg:grid-cols-3 grid-cols-1 gap-[5%] mt-20 lg:mb-0 mb-5">
        <div className="relative bg-white px-6 pb-6 rounded-2xl mx-auto ">
          {/* float icon */}
          <div className="bg-[#F3F3F3] p-3 absolute left-6 -top-16 rounded-full ">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#F3F3F3] p-2">
                <ShieldCheck size={45} color="#00B047" className="" />
              </div>
            </div>
          </div>

          {/* info container */}
          <div className="mt-20 ">
            <Heading
              name="Verified Properties"
              style="font-medium text-[24px] leading-[29px] text-[#5C5C5C] mb-4"
            />
            <p className="text-[#7676761] text-[14px] leading-[21px] font-normal">
              quis id tincidunt viverra felis, elit. Praesent malesuada eget
              nibh Nunc ullamcorper eget vehicula, enim. Quisque non
              sollicitudin. viverra tortor. urna eget
            </p>
            <p className="underline text-primary  text-[14px] leading-[21px] font-normal">
              See More
            </p>
          </div>
        </div>

        <div className="relative bg-white  rounded-2xl mx-auto px-6 pb-6">
          {/* float icon */}
          <div className="bg-[#F3F3F3] p-3 absolute left-6 -top-16 rounded-full">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#F3F3F3] p-2">
                <Mailbox size={45} color="white" className="" />
              </div>
            </div>
          </div>

          {/* info container */}
          <div className="mt-20">
            <Heading
              name="24/7 Consultation"
              style="font-medium text-[24px] leading-[29px] text-[#5C5C5C] mb-4"
            />
            <p className="text-[#7676761] text-[14px] leading-[21px] font-normal">
              quis id tincidunt viverra felis, elit. Praesent malesuada eget
              nibh Nunc ullamcorper eget vehicula, enim. Quisque non
              sollicitudin. viverra tortor. urna eget
            </p>
            <p className="underline text-primary  text-[14px] leading-[21px] font-normal">
              See More
            </p>
          </div>
        </div>

        <div className="relative bg-white  rounded-2xl mx-auto px-6 pb-6">
          {/* float icon */}
          <div className="bg-[#F3F3F3] p-3 absolute left-6 -top-16 rounded-full">
            <div className="w-fit h-fit rounded-full bg-white p-2">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#F3F3F3] p-2">
                <RiRefund2Line size={45} color="#007490" className="" />
              </div>
            </div>
          </div>

          {/* info container */}
          <div className="mt-20"> 
            <Heading
              name="Refund Policy"
              style="font-medium text-[24px] leading-[29px] text-[#5C5C5C] mb-4"
            />
            <p className="text-[#7676761] text-[14px] leading-[21px] font-normal">
              quis id tincidunt viverra felis, elit. Praesent malesuada eget
              nibh Nunc ullamcorper eget vehicula, enim. Quisque non
              sollicitudin. viverra tortor. urna eget
            </p>
            <p className="underline text-primary  text-[14px] leading-[21px] font-normal">
              See More
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default WhyUse;