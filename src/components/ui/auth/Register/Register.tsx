/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TextInput from "@/components/shared/TextInput";
import { ConfigProvider, Form, Input, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CiInboxIn } from "react-icons/ci";

interface ValuesType {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirm_password: string;
}

const Register: React.FC = () => {
  const router = useRouter();

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
 
  const onFinish = async (values: ValuesType) => {
    console.log(values);
    localStorage.setItem("userType", "register");
    router.push(`/verify-otp?email=${values.email}`);
  };

  return (
    <div className="lg:w-[670px] w-full ">
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
              name="dob"
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

          <Form.Item
            name="airlineId"
            label={<p className="text-[#4E4E4E] text-[16px]">Government-Issued Identification</p>}
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
              <p className="ant-upload-text !text-[#777575]">Drag file to upload</p>

            </Dragger>
          </Form.Item>

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
        <Link href="/login" className="text-[#1854F9] font-semibold" > Sign Up</Link>
      </div>

    </div>
  );
};

export default Register;
