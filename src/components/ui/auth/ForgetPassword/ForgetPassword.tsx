"use client"
import TextInput from "@/components/shared/TextInput";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const ForgetPassword = () => {
  const router = useRouter()

  const onFinish = async (values: { email: string }) => {
    localStorage.setItem("userType", "forget")

    router.push(`/verify-otp?email=${values?.email}`);

  };

  return (
    <div className="lg:p-8 p-5  lg:w-[600px] w-full ">

      <div className="text-center mb-4">
        <h1 className="text-[25px] font-semibold ">Forgot Password ?</h1>

      </div>

      <Form layout="vertical" onFinish={onFinish}>

        <TextInput name={"email"} label={"Email"} />

        <Form.Item>
          <button
            type="submit"
            className="flex items-center justify-center bg-primary rounded-full w-full h-[48px] text-white font-normal text-lg mt-0"
          >
            Send OTP
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassword;