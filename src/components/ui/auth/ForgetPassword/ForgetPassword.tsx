"use client"
import TextInput from "@/components/shared/TextInput";
import { myFetch } from "@/helpers/myFetch";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const router = useRouter()

  const onFinish = async (values: { email: string }) => {

    try {
      const res = await myFetch("/auth/forget-password", {
        method: "POST",
        body: values,
      });
      if (res?.success) {
        toast.success(res?.message || "OTP verified successfully", { id: "forget" });
        localStorage.setItem("userType", "forget")
        router.push(`/verify-otp?email=${values?.email}`);
      } else {
        if (res?.error && Array.isArray(res.error)) {
          res.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "forget" });
          });
        } else {
          toast.error(res?.message || "Something went wrong!", { id: "forget" });
        }
      }
    } catch (error) {
      console.error(error);
    }
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