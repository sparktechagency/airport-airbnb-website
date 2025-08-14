"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import NoContent from "@/components/shared/NoContent";
import { faqs } from "@/constants/faq/faqData";
import { Pagination } from 'antd';

type ContentRef = HTMLDivElement | null;

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<ContentRef[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFaqs = faqs.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setOpenIndex(null); // Reset open accordion when changing pages
    };

    return (
        <div className="pb-20">
            <div>
                <p className="lg:text-[32px] text-2xl font-normal text-primary container text-center pb-8">Popular Frequently Asked Questions</p>

                <div className="container grid grid-cols-1 gap-6">
                    <>
                        {faqs && faqs.length > 0 ? (
                            <>
                                {currentFaqs.map((faq: { question: string, answer: React.JSX.Element }, index: number) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden transition-max-height duration-300 ease-in-out rounded-lg bg-white cursor-pointer relative lg:h-[56px] h-[65px] shadow"
                                        onClick={() => toggleAccordion(index)}
                                        style={{
                                            minHeight:
                                                openIndex === index
                                                    ? `${contentRefs.current[index]?.scrollHeight}px`
                                                    : "50px",
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
                                                <p className="lg:text-[16px] text-sm leading-6 font-medium text-[#3E3E3E]">
                                                    {faq?.question}
                                                </p>
                                                <MdKeyboardArrowRight
                                                    color="white"
                                                    className={`bg-primary border rounded-full lg:text-2xl text-xl transition-all ${openIndex === index ? "rotate-90" : ""}`}
                                                />
                                            </div>
                                            <div className="lg:text-[16px] text-sm leading-6 font-normal text-[#5C5C5C] my-5 pb-3">
                                                {faq?.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-center mt-6">
                                    <Pagination
                                        current={currentPage}
                                        pageSize={itemsPerPage}
                                        total={faqs.length}
                                        onChange={handlePageChange}
                                        showSizeChanger={false}
                                    />
                                </div>
                            </>
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