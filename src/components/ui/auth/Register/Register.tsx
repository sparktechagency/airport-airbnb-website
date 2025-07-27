"use client";

import SocialLogin from "@/components/shared/SocialLogin";
import TextInput from "@/components/shared/TextInput";
import { ConfigProvider, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ValuesType {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirm_password: string;
}

const Register: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: ValuesType) => {
    console.log(values);
    localStorage.setItem("userType", "register");
    router.push(`/verify-otp?email=${values.email}`);
  };

  return (
    <div>
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
          <TextInput name="name" label="Full Name" />
          <TextInput name="email" label="Email" />
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

          <Form.Item
            name="confirm_password"
            label={<p className="text-[#4E4E4E] text-[16px]">Confirm Password</p>}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
            className="mb-10"
          >
            <Input.Password
              placeholder="Confirm password"
              className="border border-gray-300 h-[48px] bg-white rounded-full"
              style={{ borderRadius: "50px" }}
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full h-[45px] text-white font-medium text-lg bg-primary rounded-full flex items-center justify-center mt-4"
            >
              Sign up
            </button>
          </Form.Item>
        </Form>

      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {
            colorText: "#636363",
          },
        }}
      >
        <Divider className="font-normal text-gray-500">or</Divider>
      </ConfigProvider>

      <SocialLogin />

      <div className=" flex items-center justify-center gap-1 py-4">
        <p className="text-[#636363]">Have an account?</p>
        <Link href="/login" className="text-[#1854F9] font-semibold" > Sign Up</Link>
      </div>

    </div>
  );
};

export default Register;
