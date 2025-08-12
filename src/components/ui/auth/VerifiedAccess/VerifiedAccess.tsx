/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, message } from "antd";
import { CiInboxIn } from "react-icons/ci";
import Dragger from "antd/es/upload/Dragger";
import TextInput from "@/components/shared/TextInput";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const VerifiedAccess = () => {
        const router = useRouter()
    const props = {
        name: 'file',
        multiple: false,
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Replace with your file upload endpoint
        onChange(info: { file: any }) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed`);
            }
        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const onFinish = () => {
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
                    name="airlineId"
                    label={<p className="text-[#4E4E4E] text-[16px]">Upload Employee Card</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please upload your Employee Card!",
                        },
                    ]}
                >
                    <Dragger {...props} style={{ width: '100%', borderRadius: '10px', borderColor: '#E0E0E0', backgroundColor: '#FEFEFE' }}>
                        <p className="ant-upload-drag-icon  flex items-center justify-center ">
                            <CiInboxIn size={40} color="#767676" />
                        </p>
                        <p className="ant-upload-text text-[#767676]">Drag file to upload</p>

                    </Dragger>
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