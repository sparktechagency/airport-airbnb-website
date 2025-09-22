"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { myFetch } from "@/helpers/myFetch";

const Footer = () => {
    const [form] = Form.useForm();

    const item = [
        {
            label: "About",
            path: "/about",
        },
        {
            label: "Services",
            path: "/services",
        },
        {
            label: "Supports",
            path: "/support",
        },
    ];

    const items = [
        {
            label: "Privacy Policy",
            path: "/privacy",
        },
        {
            label: "Terms & Conditions",
            path: "/terms",
        },
        {
            label: "Disclaimer",
            path: "/disclaimer",
        },
    ];

    const handleSubscribeEmail = async (values: { email: string }) => {
        try {
            const res = await myFetch("/subscribe", {
                method: "POST",
                body: values,
            });
            if (res?.success) {
                form.resetFields();
                toast.success(res?.message || " Thank you for subscribing", { id: "subscribe" });

            } else {
                if (res?.error && Array.isArray(res.error)) {
                    res.error.forEach((err: { message: string }) => {
                        toast.error(err.message, { id: "subscribe" });
                    });
                } else {
                    toast.error(res?.message || "Something went wrong!", { id: "subscribe" });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div
            className=""
            style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url('/footer.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <div className="container grid grid-cols-12  lg:px-1 px-3 gap-8 md:gap-0 py-10">
                <Link href={"/"} className="col-span-12 mb-4">
                    <Image alt="Logo" src="/airbnb-logo.png" width={70} height={70} />
                </Link>
                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4 mx-auto sm:mx-0">
                    <p className="text-[#F3F3F3] text-sm font-normal pe-8">
                        FlightDelayStays.com is a website dedicated to bringing people together while improving the current status of their situation. Always remember us when seeking a room near the airport.
                    </p>
                </div>

                <div className="col-span-6 sm:col-span-6  md:col-span-4 lg:col-span-2 flex flex-col gap-4">
                    {item.map((menu, index) => {
                        return (
                            <Link
                                key={index}
                                className={`lg:h-[21px] h-4
                                        font-normal lg:text-[16px] text-sm leading-6 
                                        text-[#F3F3F3]
                                        border-[#D9D9D9]
                                    `}
                                href={`${menu.path}`}
                            >
                                {menu.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="col-span-6 sm:col-span-6  md:col-span-4 lg:col-span-2 flex flex-col gap-4">
                    {items.map((menu, index) => {
                        return (
                            <Link
                                key={index}
                                className={`
                                        lg:h-[21px] h-4 
                                        font-normal lg:text-[16px] text-sm leading-6 
                                        text-[#F3F3F3]
                                        border-[#D9D9D9]
                                    `}
                                href={`${menu.path}`}
                            >
                                {menu.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4">
                    <p className="font-semibold lg:text-[16px] text-sm leading-[20px] text-[#F3F3F3] mb-2"> Get in touch ! </p>
                    <Form
                        form={form}
                        onFinish={handleSubscribeEmail}
                        className="w-full flex md:items-center flex-col md:flex-row lg:gap-4 gap-2 lg:p-1"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email!" },
                                { type: "email", message: "Please enter a valid email!" },
                            ]}
                            className="w-full"
                        >
                            <Input
                                placeholder="Enter Your Email"
                                style={{
                                    width: "100%",
                                    height: 40,
                                    border: "1px solid #BBBBBB",
                                    boxShadow: "none",
                                    outline: "none",
                                    color: "#5C5C5C",
                                    background: "#FFFFFF",
                                }}
                                className="placeholder:text-[#5C5C5C]"
                            />
                        </Form.Item>

                        <Form.Item className="m-0">
                            <Button
                                htmlType="submit"
                                style={{
                                    background: "#083A65",
                                    color: "white",
                                    border: "none",
                                    height: 42,
                                }}
                            >
                                Subscribe
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex items-center justify-center lg:justify-start gap-6 mt-6">
                        <a href="https://www.facebook.com/groups/796073412777047" target="_blank">
                            <Image alt="social-link" src={"/facebook.png"} width={32} height={32} />
                        </a>
                        <a href="https://www.tiktok.com/@flightdelaystays" target="_blank">
                            <Image alt="social-link" src={"/tiktok.png"} width={30} height={30} />
                        </a>

                        <a href="https://www.instagram.com/flightdelaystays" target="_blank">
                            <Image alt="social-link" src={"/insta.png"} width={32} height={32} />
                        </a>

                        <a href="https://www.linkedin.com/company/flightdelaystays-com/about/?viewAsMember=true " target="_blank">
                            <Image alt="social-link" src={"/linkedIn.png"} width={32} height={32} />
                        </a>

                    </div>
                </div>
            </div>

            <div className="bg-[#333333] py-3">
                <p className="text-center text-[#ffffff] lg:text-sm text-xs">
                    © {new Date().getFullYear()} FlightDelayStays.com — Bringing people together, one stay at a time.
                </p>
            </div>
        </div>
    );
};

export default Footer;