import { Props } from '@/types/StepsOfHost/stepOfHostType';
import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FormInstance } from 'antd';

interface FormValues {
    hotelName: string;
    location: string;
    roomType: string;
    roomValue: number;
    facilities: string[];
    images: File[];
}
interface FooterProps extends Props {
    form: FormInstance;
    setAllFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

const StepsFooter = ({ current, setCurrent, steps, form, setAllFormValues }: FooterProps) => {
    const next = async () => {
        try {
            await form.validateFields();
            const currentValues = await form.validateFields();
            console.log("current value ", currentValues);
            setAllFormValues((prev) => ({
                ...prev,
                ...currentValues,
            }));
            setCurrent((prev: number) => Math.min(prev + 1, steps.length - 1));
        } catch (error) {
            console.log("Validation failed", error);
        }
    };
    const prev = () => setCurrent((prev: number) => Math.max(prev - 1, 0));

    return (
        <div className="steps-action flex items-center justify-end gap-3 pb-5">
            {current > 0 && (
                <button
                    onClick={prev}
                    type="button"
                    className="text-primary font-medium border rounded border-primary mt-6 px-5 h-[44px] flex items-center gap-1"
                >
                    <BsArrowLeft color="#0a2369" size={22} />
                    <span>Previous</span>
                </button>
            )}

            {current < steps.length - 1 && (
                <button
                    onClick={next}
                    type="button"
                    className="mt-6 px-5 h-[45px] bg-primary text-white flex items-center gap-1 rounded"
                >
                    <span>Continue</span>
                    <BsArrowRight size={22} />
                </button>
            )}

            {current === steps.length - 1 && (
                <button
                    type="submit"
                    className="mt-6 px-5 py-[10px] bg-primary text-white rounded"
                >
                    Done
                </button>
            )}
        </div>
    );
};

export default StepsFooter;
