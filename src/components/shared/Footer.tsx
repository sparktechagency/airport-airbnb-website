"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Input } from "antd";

const Footer = () => {

    const [keyword, setKeyword] = useState("");

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

    const handleSendGetInTouchEmail = async () => {
        // const data = {
        //   email: keyword,
        // };

        // try {
        //   const res = await sendGetInTouchEmail(data).unwrap();

        //   if (res.success) {
        //     notification.success({
        //       message: "Success",
        //       description: "Email Subscribe successfully!",
        //       placement: "bottomRight",
        //       duration: 2,
        //     });
        //   }
        // } catch (error) {
        //   console.error("Failed to send email", error);
        // }
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
                    <div className="w-full flex md:items-center flex-col md:flex-row lg:gap-4 gap-2 lg:p-1">
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
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="placeholder:text-[#5C5C5C]"
                        />

                        <Button
                            onClick={handleSendGetInTouchEmail}
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
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-6 mt-6">
                        <a href="https://www.facebook.com/" target="_blank">
                            <Image alt="social-link" src={"/facebook.png"} width={32} height={32} />
                        </a>

                        <a href="https://www.instagram.com/" target="_blank">
                            <Image alt="social-link" src={"/insta.png"} width={32} height={32} />
                        </a>

                        <a href="https://www.linkedin.com/" target="_blank">
                            <Image alt="social-link" src={"/linkedIn.png"} width={32} height={32} />
                        </a>

                    </div>
                </div>
            </div>

            <div className="bg-[#333333] py-3">
                <p className="text-center text-[#ffffff] lg:text-sm text-xs">
                    © Copyright UX/UI 2204 Team Md. Asadujjaman Mahfuz
                </p>
            </div>
        </div>
    );
};

export default Footer;