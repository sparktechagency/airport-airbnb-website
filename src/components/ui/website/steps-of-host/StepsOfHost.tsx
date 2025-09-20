"use client";
import { useState } from "react";
import { Form, Progress } from "antd";
import StepsFooter from "./StepsFooter";
import HotelName from "./HotelName";
import RoomValue from "./RoomValue";
import SelectRoomType from "./SelectRoomType";
import SelectLocation from "./SelectLocation";
import UploadImage from "../property-info/UploadImage";
import RoomDetails from "../property-info/RoomDetails";
import Facilities from "../property-info/Facilities";
import Calender from "@/components/shared/Calendar";
import UploadUtilityBill from "./UploadUtilityBill";
// import VerifyBankAccount from "./VerifyBankAccount"; 
import type { UploadFile } from "antd";
import HomeRuleForm from "../property-info/HomeRule";
import { myFetch } from "@/helpers/myFetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormValues {
  hotelName: string;
  location: string;
  roomType: string;
  roomValue: number;
  facilities: string[];
  images: File[];
  rules: {
    title: string; description: string
  }
}

const StepsOfHost = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const router = useRouter()

  // State across steps
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [content, setContent] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [roomClosureDates, setRoomClosureDates] = useState<string[]>([]);
  const [homeRules, setHomeRules] = useState<{ title: string; description: string }[]>([]);
  const [location, setLocation] = useState<string>("");
  const [doc, setDoc] = useState<{ utilityBill?: File | null }>({});
  const [allFormValues, setAllFormValues] = useState<FormValues>();


  const steps = [
    { title: "List Your Hotel Name", content: <HotelName /> },
    { title: "Define Your Room Value", content: <RoomValue /> },
    { title: "Select Room Type", content: <SelectRoomType /> },
    { title: "Select Location", content: <SelectLocation setLocation={setLocation} location={location} /> },
    { title: "Add Room Photos", content: <UploadImage fileList={fileList} setFileList={setFileList} /> },
    { title: "Describe Your Room", content: <RoomDetails content={content} setContent={setContent} /> },
    { title: "Show guests what makes your place special", content: <Facilities selectedFacilities={selectedFacilities} setSelectedFacilities={setSelectedFacilities} /> },
    { title: "Set Room Closure Date (optional)", content: <Calender setDate={setRoomClosureDates} unavailableDay={[]} selectedDate={roomClosureDates} /> },
    { title: "House Rules", content: <HomeRuleForm setHomeRules={setHomeRules} homeRules={homeRules} /> },
    { title: "Upload Utility Bill", content: <UploadUtilityBill setDoc={setDoc} doc={doc} /> },
    // { title: "Verify Your Bank Account", content: <VerifyBankAccount /> }, 
  ];

  const progressPercent = Math.round(((current + 1) / steps.length) * 100);


  const handleFinish = async (values: FormValues) => {
    const formData = new FormData();
    const formValues = {
      ...allFormValues,
      ...values,
    }

    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value as any);
    })

    if (fileList) {
      fileList.forEach((file) => {
        formData.append("image", file.originFileObj as Blob);
      });
    }



    if (selectedFacilities) {
      selectedFacilities.forEach((facility) => formData.append("facilities", facility)); 
    }

    if (roomClosureDates) {
      roomClosureDates.forEach((dates) => formData.append("roomClosureDates", dates));
    }

    homeRules.forEach((rule, index) => {
      formData.append(`hotelRules[${index}][title]`, rule.title);
      formData.append(`hotelRules[${index}][description]`, rule.description);
    });

    if (location) {
      formData.append("address", location);
    }

    if (content) {
      formData.append("description", content);
    }

    if (doc.utilityBill) {
      formData.append("doc", doc.utilityBill);
    }

    try {
      const res = await myFetch("/hotel", {
        method: "POST",
        body: formData,
      });
      console.log(res);

      if (res?.success) {
        toast.success(res?.message || "", { id: "step-host" });

        router.push(`/profile?tab=8`);
      } else {
        if (res?.error && Array.isArray(res.error)) {
          res.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "step-host" });
          });
        } else {
          toast.error(res?.message || "Something went wrong!", { id: "step-host" });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-85px)] pt-[85px]">
      <p className="text-end container text-primary text-lg font-medium">
        {current + 1}/{steps.length}
      </p>

      <div className="container px-4">
        <Progress percent={progressPercent} showInfo={false} strokeColor="#083a65" />

        <div className="pb-8 pt-11">
          <p className="text-primary text-2xl font-medium pb-2">Property Information</p>
          <p className="text-[#6B6B6B] text-sm font-normal">Tell us about the space you’re listing.</p>
        </div>

        {/* Form wrapper */}
        <Form form={form} onFinish={handleFinish} className="w-full">
          <div className="lg:text-[32px] text-[20px] text-[#222222] font-medium py-3">
            {steps[current]?.title}
          </div>
          <div className="min-h-[350px]">{steps[current]?.content}</div>

          {/* Footer buttons */}
          <StepsFooter current={current} setCurrent={setCurrent} steps={steps} form={form} setAllFormValues={setAllFormValues as any} />
        </Form>
      </div>
    </div>
  );
};

export default StepsOfHost;
