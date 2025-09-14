/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "antd";
import { CiInboxIn } from "react-icons/ci";
import TextInput from "@/components/shared/TextInput";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateAppData } from "@/helpers/storageHelper";

const VerifiedAccess = () => {
    const router = useRouter()
    const [fileUrl, setFileUrl] = useState<string | null>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFileUrl(base64String);
            };

            reader.readAsDataURL(file);
        }
    };

    const onFinish = (values: { employeeId: string }) => {
        updateAppData({ employeeId: values?.employeeId, image: fileUrl });

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Verification Successful!",
            text: "Your verification as a Pilot is under review. Please wait while our team approves your account to unlock exclusive discounts and accommodations.",
            showConfirmButton: false,
            timer: 1500
        })

        router.push("/subscription-plan") 
    }

    return (
        <div className="lg:p-8 p-3 lg:w-[670px] w-full">
            <h1 className="text-[25px] font-semibold text-primary pb-10 text-center  "> Upload Your Airline ID</h1>

            <Form className="w-full  " layout="vertical" onFinish={onFinish}>
                <TextInput name={"employeeId"} label={"Employee ID or License No."} />
                <Form.Item
                    label={
                        <p className="text-[#4E4E4E] text-[16px]">Upload Employee Card</p>
                    }
                    required
                >
                    <div
                        className="w-full border border-dashed border-[#E0E0E0] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center py-8 cursor-pointer"
                        onClick={() => document.getElementById("airlineIdInput")?.click()}
                    >
                        {fileUrl ? (
                            <img
                                src={fileUrl}
                                alt="Preview"
                                className="w-28 h-28 object-cover rounded-md mb-3 shadow"
                            />
                        ) : (
                            <>
                                <CiInboxIn size={40} color="#767676" />
                                <p className="text-[#767676]">Drag file to upload</p>
                            </>
                        )}
                    </div>
                    <input
                        id="airlineIdInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </Form.Item>

                <Form.Item>
                    <button
                        type="submit"
                        className="flex items-center justify-center bg-primary rounded-full w-full h-[48px] text-white font-normal text-lg mt-5"
                    >
                        Continue
                    </button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default VerifiedAccess;