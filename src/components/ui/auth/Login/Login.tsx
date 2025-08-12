"use client"

import SocialLogin from "@/components/shared/SocialLogin";
import TextInput from "@/components/shared/TextInput";
import { Checkbox, ConfigProvider, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const router = useRouter()

  const onFinish = async (values: { email: string, password: string }) => {
    console.log(values);
    router.push("/subscription-plan")
  };

  return (
    <div className="p-5 w-[670px] "> 

      <div className=" mb-10 flex flex-col items-center justify-center ">
        <h1 className="text-[24px] font-semibold mb-2">Log in to your account</h1>
        <p className="text-sm font-normal "> Please enter your email and password to continue</p>
      </div> 

      <Form
        onFinish={onFinish}
        layout="vertical"
      >
        <TextInput name={"email"} label={"Email"} />
        <Form.Item
          name="password"
          label={<p>Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 48,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
              borderRadius: "50px",
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item style={{ marginBottom: 0 }} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot text-primary font-semibold"
            href="/forgot-password"
          >
            Forgot password?
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            type="submit"
            className="flex items-center justify-center bg-primary rounded-full w-full mt-5 text-lg font-normal h-12 text-white "
          >
            {/* {isLoading? < Spinner/> : "Sign in"} */} Sign in
          </button>
        </Form.Item>
      </Form> 

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
        <p className="text-[#636363]">Don’t have any account?</p>
        <Link href="/register" className="text-[#1854F9] font-semibold" > Sign Up</Link>
      </div> 
      
    </div>
  );
};

export default Login;