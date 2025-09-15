"use client"
import { myFetch } from "@/helpers/myFetch";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  console.log("token", token);

  const onFinish = async (values: { newPassword: string, confirmPassword: string }) => {
    const data = {
      token: token,
      ...values
    }

    try {
      const res = await myFetch("/auth/reset-password", {
        method: "POST",
        body: data,
      }); 
      console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Password reset successfully", { id: "reset" });
        router.push(`/login`);
      } else {
        if (res?.error && Array.isArray(res.error)) {
          res.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "reset" });
          });
        } else {
          toast.error(res?.message || "Something went wrong!", { id: "reset" });
        }
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="lg:p-8 p-5 lg:w-[670px] w-full">

      <div className=" mb-6 flex flex-col items-center justify-center ">
        <h1 className="text-[25px] font-semibold text-primary pb-6 ">Set a new password</h1>
        <p className=" text-[16px] text-[#818181]  text-center w-2/3">Create a new password. Ensure it differs from  previous ones for security</p>
      </div>
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="newPassword"
          label={<p
            style={{
              display: "block",
              color: "#5C5C5C",
            }}
            className="font-semibold "
          >
            New Password
          </p>}
          rules={[
            {
              required: true,
              message: "Please input your new Password!",
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Input.Password
            type="password"
            placeholder="Enter New password"
            style={{
              border: "1px solid #E0E4EC",
              height: "48px",
              background: "white",
              borderRadius: "50px",
              outline: "none",
            }}
            className="mb-6"
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 0 }}
          label={<p
            style={{
              display: "block",
              color: "#5C5C5C",
            }}
            className="font-semibold"
          >
            Confirm Password
          </p>}
          name="confirmPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter Confirm password"
            style={{
              border: "1px solid #E0E4EC",
              height: "48px",
              background: "white",
              borderRadius: "50px",
              outline: "none",
            }}
            className="mb-6"
          />
        </Form.Item>


        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            style={{
              width: '100%',
              height: 48,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",
              background: "#083A65",
              borderRadius: "50px",
              marginTop: 20
            }}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;