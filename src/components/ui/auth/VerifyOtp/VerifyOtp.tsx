"use client"

import { myFetch } from "@/helpers/myFetch";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const emailFromQuery = new URLSearchParams(window.location.search).get('email');
    setEmail(emailFromQuery);
  }, []);

  const onFinish = async (values: { otp: string }) => {
    const userType = localStorage.getItem("userType")
    const data = {
      email: email,
      oneTimeCode: parseInt(values?.otp)
    }

    try {
      const res = await myFetch("/auth/verify-email", {
        method: "POST",
        body: data,
      });
      if (res?.success) {
        toast.success(res?.message || "OTP verified successfully", { id: "otp-verify" });
        if (userType === "forget") {
          router.push(`/reset-password`);
        } else {
          router.push(`/verified-airline`);
        }
      } else {
        toast.error(res?.message || "Something went wrong!", {
          id: "otp-verify",
        });
      }
    } catch (error) {
      console.error(error);
    }


  };


  const handleResendEmail = async () => {
    const data = {
      email: email
    }

    try {
      const res = await myFetch("/auth/resend-otp", {
        method: "POST",
        body: data,
      }); 

      if (res?.success) {
        toast.success(res?.message || "OTP verified successfully", { id: "otp-resend" });
      } else {
        toast.error(res?.message || "Something went wrong!", {
          id: "otp-resend",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="lg:p-8 p-5 lg:w-[600px] ">

      <div className=" mb-8 flex flex-col items-center justify-center ">
        <h1 className="text-[24px] font-semibold mb-6  ">Verification code</h1>
        <p className=" text-[16px] text-[#818181]  text-center">We sent a reset link to {email ? email : "your email"}. <br />
          enter 5 digit code that is mentioned in the email</p>
      </div>


      <Form layout="vertical" onFinish={onFinish} className=" flex flex-col items-center justify-center w-full">

        <div className=" flex items-center justify-center w-full ">

        </div>

        <ConfigProvider
          theme={{
            components: {
              Input: {
                // lineHeight: 3,
                controlHeight: 55,
                hoverBorderColor: "#286a25",
                activeBorderColor: "#286a25",
                borderRadius: 10,
              },
            },
            token: {
              colorPrimary: '#286a25',
              colorBorder: "#286a25",
            },
          }}
        >
          <Form.Item
            className=" "
            name="otp"
            rules={[{ required: true, message: 'Please input otp code here!' }]}
          >
            <Input.OTP
              style={{

                height: 50,

              }}
              className="verify-otp-input "
              variant="filled"
              length={4}
            />
          </Form.Item>
        </ConfigProvider>
        <div className=" w-full mt-3 ">

          <Form.Item style={{ marginBottom: 0 }} className=" w-full" >
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                height: 48,
                border: "1px solid #d9d9d9",
                outline: "none",
                boxShadow: "none",
                background: "#083A65",
                borderRadius: "50px",
                color: "white"
              }}
            >
              Verify Code
            </Button>
          </Form.Item>
        </div>
      </Form>


      <div className="flex items-center justify-center gap-1 mt-6 ">
        <p className="text-[16px] text-[#818181] ">You have not received the email?</p>

        <p
          onClick={handleResendEmail}
          className="login-form-forgot underline font-medium text-[16px] text-primary"
          style={{ color: "#00B047", cursor: "pointer" }}
        >
          Resend
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;