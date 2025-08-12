"use client"
import { SubscriptionPlans } from '@/constants/Subscription/Subscription';
import { CheckCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SubscriptionsPlans = () => { 
  const [selected , setSelected] = useState(1) 
  const router = useRouter()
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
        {SubscriptionPlans.map((plan, index) => (
          <div
            key={index}
            className="flex-1" 
            onClick={()=>setSelected(index)}
          >
            <div className={`
              relative bg-white rounded-xl shadow-xl h-full flex flex-col p-5
              ${selected === index  ? 'border border-primary' : ''}
             
            `}>
              {/* Plan Header */}
              <div className="text-center mb-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-0">
                  <span className={`
                    text-[28px] font-semibold
                    ${selected === index ? 'text-primary' : 'text-[#2563EB]'}
                  `}>
                    ${plan.price}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500">
                  {plan.billingType}
                </p>
              </div>

              {/* Features List */}
              <div className="flex-grow mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
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
              `} onClick={()=>router.push("/")}>
                {plan.buttonText}
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