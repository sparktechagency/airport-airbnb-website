"use client"

import TextInput from "@/components/shared/TextInput";
import { myFetch } from "@/helpers/myFetch";
import { Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter()

  const onFinish = async (values: { email: string, password: string }) => {

    try {
      const res = await myFetch("/auth/login", {
        method: "POST",
        body: values,
      });
      if (res?.success) {
        toast.success(res?.message || "Login successfully", { id: "login" }); 
        router.push("/home")
      } else {
        toast.error(res?.message || "Something went wrong!", {
          id: "login",
        });
      }
    } catch (error) {
      console.error(error);
    }
   
  };

  return (
    <div className="p-5 lg:w-[670px] w-full ">

      <div className=" lg:mb-10 mb-5 flex flex-col items-center justify-center ">
        <h1 className="text-[24px] font-semibold mb-2 text-center">Log in to your account</h1>
        <p className="text-sm font-normal text-center "> Please enter your email and password to continue</p>
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

      <div className=" flex items-center justify-center gap-1 py-4">
        <p className="text-[#636363]">Don’t have any account?</p>
        <Link href="/register" className="text-[#1854F9] font-semibold" > Sign Up</Link>
      </div>

    </div>
  );
};

export default Login;