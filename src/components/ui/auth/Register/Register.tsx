/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TextInput from "@/components/shared/TextInput";
import { myFetch } from "@/helpers/myFetch";
import { ConfigProvider, Form, Input } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiInboxIn } from "react-icons/ci";
import toast from "react-hot-toast";
import { updateAppData } from "@/helpers/storageHelper";

interface ValuesType {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirm_password: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [documents, setDocuments] = useState<File[]>([]);
  const handleFileUpload = (file: File) => {
    if (documents.some((doc) => doc.name === file.name)) return false;
    setDocuments((prev) => [...prev, file]);

    return false;
  };

  const uploadProps = () => ({
    name: "file",
    multiple: true,
    showUploadList: true,
    beforeUpload: (file: File) => handleFileUpload(file),
  });


  const onFinish = async (values: ValuesType) => {
    const formData = new FormData();

    if (documents) {
      documents.forEach((file) => formData.append("image", file));
    }

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    })

    try {
      const res = await myFetch("/user", {
        method: "POST",
        body: formData,
      });
      console.log(res);

      if (res?.success) {
        toast.success("Account created successfully!", { id: "sign-up" });
        localStorage.setItem("userType", "register");
        updateAppData({ email: res?.data?.email });
        router.push(`/verify-otp?email=${values.email}`);
      } else {
        if (res?.error && Array.isArray(res.error)) {
          res.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "sign-up" });
          });
        } else {
          toast.error(res?.message || "Something went wrong!", { id: "sign-up" });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // sfs

  return (
    <div className="lg:w-[670px] w-full overflow-y-auto ">
      <div className=" mb-10 flex flex-col items-center justify-center ">
        <h1 className="text-[24px] font-semibold mb-2">Sign up</h1>
        <p className="text-sm font-normal "> Please Enter Your Personal Data</p>
      </div>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 0,
          },
          components: {
            Input: {
              //   borderColor: "#d9d9d9",  
              hoverBorderColor: "#d9d9d9",
            },
          },
        }}
      >
        <Form onFinish={onFinish} layout="vertical">

          <div className=" grid lg:grid-cols-2 grid-cols-1 gap-x-5">

            <TextInput name="name" label="Full Name" />
            <TextInput name="email" label="Email" />
            <Form.Item
              name="dateOfBirth"
              label={<p className="text-[#4E4E4E] text-[16px]">Date of Birth</p>}
              rules={[
                {
                  required: true,
                  message: `Please enter your Date of Birth`,
                },
              ]}
            >

              <Input
                placeholder={`dd/mm/yyyy`}
                style={{
                  height: 48,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none",
                  backgroundColor: "white",
                  borderRadius: "50px",
                }}
              />

            </Form.Item>
            <TextInput name="contact" label="Contact Number" />
          </div>

          <Form.Item
            name="address"
            label={<p className="text-[#4E4E4E] text-[16px] ">Address (Street, City, State, ZIP Code)</p>}
            rules={[
              {
                required: true,
                message: `Please enter your address`,
              },
            ]}
          >

            <Input
              placeholder={`Enter your address`}
              style={{
                height: 48,
                border: "1px solid #d9d9d9",
                outline: "none",
                boxShadow: "none",
                backgroundColor: "white",
                borderRadius: "50px",
              }}
            />
          </Form.Item>

          <div >
            <p className="text-[#4E4E4E] text-[16px] mb-2">Government-Issued Identification</p>

            <Dragger  {...uploadProps()} style={{ width: '100%', borderRadius: '10px', borderColor: '#E0E0E0', backgroundColor: '#FEFEFE', marginBottom: "30px" }}>
              <p className="ant-upload-drag-icon  flex items-center justify-center ">
                <CiInboxIn size={40} color="#767676" />
              </p>
              <p className="ant-upload-text !text-[#777575]">Drag file to upload</p>

            </Dragger>
          </div>

          <Form.Item
            name="password"
            label={<p className="text-[#4E4E4E] text-[16px]">Password</p>}
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
            className="mb-5"
          >
            <Input.Password
              placeholder="Enter password"
              className="border border-gray-300 h-[48px] bg-white rounded-full"
              style={{ borderRadius: "50px" }}
            />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full h-[45px] text-white font-normal text-lg bg-primary rounded-full flex items-center justify-center mt-4"
            >
              Sign up
            </button>
          </Form.Item>
        </Form>

      </ConfigProvider>


      <div className=" flex items-center justify-center gap-1 pb-3 pt-1">
        <p className="text-[#636363]">Have an account?</p>
        <Link href="/login" className="text-[#1854F9] font-semibold" > Log In</Link>
      </div>

    </div>
  );
};

export default Register;
