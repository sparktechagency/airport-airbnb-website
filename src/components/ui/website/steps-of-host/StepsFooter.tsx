import { Props } from '@/types/StepsOfHost/stepOfHostType';
import Link from 'next/link';
import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const StepsFooter = ({ current, setCurrent, steps }: Props) => {

    const next = () => {
        setCurrent((prev: number) => Math.max(prev + 1, 0));
    }
    const prev = () => {
        setCurrent((prev: number) => Math.max(prev - 1, 0));
    };

    return (
        <div className="steps-action flex items-center justify-end gap-3 pb-5">
            {current > 0 && (
                <button
                    onClick={prev}
                    className="text-primary font-medium border rounded border-primary mt-6 px-5 h-[44px] flex items-center gap-1"
                >
                    <BsArrowLeft color="#0a2369" size={22} /> 
                    <span>Previous</span>
                </button>
            )}

            {current < steps.length - 1 && (
                <button
                    onClick={next}
                    className="mt-6 px-5 h-[45px] bg-primary text-white flex items-center gap-1 rounded"
                >
                    <span>Continue</span>
                    <BsArrowRight size={22} />
                </button>
            )}

            {current === steps.length - 1 && (
                <Link href={"/profile"} className="mt-6 px-5 py-[10px] bg-primary text-white rounded"  >
                    Done
                </Link>
            )}
        </div>
    );
};

export default StepsFooter;