"use client"
import { Form, Progress, UploadFile } from "antd";
import StepsFooter from "./StepsFooter";
import { useState } from "react";
import HotelName from "./HotelName";
import RoomValue from "./RoomValue";
import SelectRoomType from "./SelectRoomType";
import SelectLocation from "./SelectLocation";
import { PropertyDetails } from "@/types/StepsOfHost/stepOfHostType";
import UploadImage from "../property-info/UploadImage";
import RoomDetails from "../property-info/RoomDetails";
import Facilities from "../property-info/Facilities";
import Calender from "@/components/shared/Calendar";
import UploadUtilityBill from "./UploadUtilityBill";
import HouseRulesInput from "./HouseRulesInput";
import VerifyBankAccount from "./VerifyBankAccount";

const StepsOfHost = () => {
    const [current, setCurrent] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [content, setContent] = useState('');
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [formData, setFormData] = useState<PropertyDetails>({
        location: "",
        latitude: 0,
        longitude: 0
    });

    const updateFormData = (newData: Partial<typeof formData>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };


    const steps = [
        {
            title: "List Your Hotel Name",
            content: <HotelName />,
            skippable: false,
        },
        {
            title: "Define Your Room Value",
            content: <RoomValue />,
            skippable: false,
        },
        {
            title: "Select Room Type",
            content: <SelectRoomType />,
            skippable: false,
        },
        {
            title: "Select Location",
            content: <SelectLocation formData={formData} updateFormData={updateFormData} />,
            skippable: false,
        },
        {
            title: "Add Room Photos",
            content: <UploadImage fileList={fileList} setFileList={setFileList} />,
            skippable: false,
        },
        {
            title: "Describe Your Room ",
            content: <RoomDetails content={content} setContent={setContent} />,
            skippable: false,
        },
        {
            title: "Show guests what makes your place special",
            content: <div className="w-1/2">  <Facilities selectedFacilities={selectedFacilities} setSelectedFacilities={setSelectedFacilities} /> </div>,
            skippable: false,
        },
        {
            title: "Set Room Closure Date (optional)",
            content: <div className="w-1/2 border border-gray-300 rounded">   <Calender unavailableDay={[]} /> </div>,
            skippable: false,
        },
        {
            title: "House Rules",
            content: <HouseRulesInput />,
            skippable: false,
        },
        {
            title: "Upload Utility Bill",
            content: <UploadUtilityBill />,
            skippable: false,
        },
        {
            title: "Verify Your Bank Account",
            content: <VerifyBankAccount />,
            skippable: false,
        },
    ];

    const progressPercent = Math.round(((current + 1) / steps.length) * 100);
    const progressColor = '#083a65'

    return (
        <div className={`  min-h-[calc(100vh-85px)] transition-all duration-1000 delay-500 ease-in-out opacity-100 translate-x-0 pt-[85px]`}>

            {/* total count  */}
            <p className=' text-end container text-primary text-lg font-medium'> {current + 1}/{steps.length} </p>

            <div className='container px-4'>

                {/* Progress bar */}
                <Progress
                    percent={progressPercent}
                    showInfo={false}
                    strokeColor={progressColor}
                />

                <div className=" pb-8 pt-11 ">
                    <p className="text-primary text-2xl font-medium pb-2 ">Property Information </p>
                    <p className=" text-[#6B6B6B] text-sm font-normal"> Tell us about the space you’re listing. </p>
                </div>

                {/* Steps content */}
                <div className="steps-content  flex items-center justify-start "  >
                    <Form className='w-full' >
                        <div className={`lg:text-[32px] text-[28px] text-[#222222] font-medium lg:tracking-wide py-3`}>{steps[current]?.title} </div>
                        <div className='   min-h-[350px]'>  {steps[current]?.content} </div>
                    </Form>
                </div>

                {/* footer buttons   */}
                <StepsFooter current={current} setCurrent={setCurrent} steps={steps} />

            </div>
        </div>
    );
};

export default StepsOfHost;