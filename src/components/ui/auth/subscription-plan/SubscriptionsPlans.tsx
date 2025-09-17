"use client"
import { myFetch } from '@/helpers/myFetch';
import { clearFilters, getFilters  } from '@/helpers/storageHelper';
import { PlansResponse } from '@/types/webPagesType';
import { CheckCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SubscriptionsPlans = ({ subscriptionData }: { subscriptionData: PlansResponse }) => {
  const [selected, setSelected] = useState(1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const appData = getFilters("subscription-plan");
    if (appData?.image) {
      setImageUrl(appData.image);
    }
  }, []);

  const handleSubmit = async (id: string) => {
    if (!imageUrl) {
      console.error("No file to submit");
      return;
    }
    // Convert Base64 → File
    const byteString = atob(imageUrl.split(",")[1]);
    const mimeString = imageUrl.split(",")[0].match(/:(.*?);/)?.[1] || "image/jpeg";

    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], "employee-card.jpg", { type: mimeString });

    const formData = new FormData();
    formData.append("image", file);

    const appData = getFilters("subscription-plan");
    Object.entries(appData).forEach(([key, value]) => {
      if (key !== "image" && value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    formData.append("plan", id);

    try {
      const res = await myFetch("/airline-verification", {
        method: "POST",
        body: formData,
      });

      if (res?.success) { 
         clearFilters("subscription-plan"); 
        router.push(res?.data?.redirectPaymentUrl); 

      } else {
        if (res?.error && Array.isArray(res.error)) {
          res.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "subscription" });
          });
        } else {
          toast.error(res?.message || "Something went wrong!", { id: "subscription" });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className=" flex flex-col items-center justify-center px-4  pt-6 pb-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="lg:text-2xl text-xl font-semibold text-[#333333] mb-2">
            Choose Your Verification Plan
          </h2>
        </div>


        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 w-full">
          {subscriptionData?.result?.map((plan, index) => (
            <div
              key={index}
              className="flex-1"
              onClick={() => setSelected(index)}
            >
              <div className={`
              relative bg-white rounded-xl shadow-xl h-full flex flex-col p-5
              ${selected === index ? 'border border-primary' : ''}
             
            `}>
                {/* Plan Header */}
                <div className="text-center mb-5">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {plan?.title}
                  </h3>

                  <div className="mb-1">
                    <span className={`
                    text-[28px] font-semibold
                    ${selected === index ? 'text-primary' : 'text-[#2563EB]'}
                  `}>
                      ${plan.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    {plan?.billingCycle}
                  </p>
                </div>

                {/* Features List */}
                <div className="flex-grow mb-8">
                  <ul className="space-y-4">
                    {plan?.features?.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className={`
                w-full py-3 px-6 rounded-lg font-normal text-base
                ${selected === index
                    ? 'bg-primary  text-white '
                    : 'hover:text-white border border-primary text-primary hover:bg-primary '
                  }
              `} onClick={() => handleSubmit(plan?._id)}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPlans;