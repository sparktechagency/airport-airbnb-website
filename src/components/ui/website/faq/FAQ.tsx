"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import NoContent from "@/components/shared/NoContent";


type ContentRef = HTMLDivElement | null;

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<ContentRef[]>([]);

    const faqs = [
        {
            question: "What is AIRPORT AIRBNB?",
            answer: "AIRPORT AIRBNB is a meal delivery service that provides fresh, ready-to-eat meals sourced from organic ingredients. Our mission is to make healthy eating easy and enjoyable without sacrificing flavor.",
        },
        {
            question: "How does AIRPORT AIRBNB work?",
            answer: "AIRPORT AIRBNB prepares and delivers meals to your door nationwide. Unlike other meal kit delivery services, our meals are delivered ready to consume, requiring no preparation or cleaning.",
        },
        {
            question: "What types of meals does AIRPORT AIRBNB offer?",
            answer: "We offer a variety of meals that cater to different dietary preferences and restrictions. Our menu includes options for vegetarians, vegans, and those with gluten-free needs.",
        },
        {
            question: "How can I place an order?",
            answer: "You can place an order through our website by selecting your desired meals and adding them to your cart. We accept various payment methods for your convenience.",
        }
    ]

    const toggleAccordion = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        if (openIndex !== null && contentRefs.current[openIndex]) {
            contentRefs.current[openIndex]!.style.maxHeight = `${contentRefs.current[openIndex]!.scrollHeight
                }px`;
        }
        contentRefs.current.forEach((ref, index) => {
            if (ref && index !== openIndex) {
                ref.style.maxHeight = "0px";
            }
        });
    }, [openIndex]);

    return (
        <div
            className=" pb-20 "
        >
            <div> 
                       <p className='text-[32px] font-normal  text-primary  container  text-center pb-8'>Popular Frequently Asked Questions</p>

                <div className="container grid grid-cols-1 gap-6 ">
                   
                    <>
                        {faqs && faqs.length > 0 ? (
                            faqs?.map((faq: { question: string, answer: string }, index: number) => (
                                <div
                                    key={index}
                                    className="overflow-hidden transition-max-height duration-300 ease-in-out rounded-lg bg-white cursor-pointer relative lg:h-[56px] h-[65px]"
                                    onClick={() => toggleAccordion(index)}
                                    style={{
                                        minHeight:
                                            openIndex === index
                                                ? `${contentRefs.current[index]?.scrollHeight}px`
                                                : "50px",
                                        boxShadow:
                                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                    }}
                                >
                                    <div
                                        ref={(el) => {
                                            if (el) {
                                                contentRefs.current[index] = el;
                                            }
                                        }}
                                        className="accordion-content p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-[16px] leading-6 font-medium text-[#3E3E3E]">
                                                {faq?.question}
                                            </p>
                                            <MdKeyboardArrowRight
                                                color="white"
                                                className={`bg-primary border rounded-full lg:text-2xl text-xl transition-all ${openIndex === index ? "rotate-90" : ""
                                                    }`}
                                            />
                                        </div>
                                        <div className="text-[16px] leading-6 font-normal text-primary my-5 pb-3">
                                            {faq?.answer}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <NoContent
                                title="No FAQs found"
                                desc="Please add faq from admin dashboard"
                            />
                        )}
                    </>
                </div>
            </div>
        </div>
    );
};

export default Faq;