import { myFetch } from '@/helpers/myFetch';
import { CheckCircleIcon } from 'lucide-react';
import React from 'react'

export default function SubscriptionPage() {
    const [subscriptionData, setSubscriptionData] = React.useState<any>();
    const [selected, setSelected] = React.useState<number | null>(null);
    React.useEffect(() => {
        myFetch(`/verification-plan`, {
            method: "GET",
        }).then((res) => {
            setSubscriptionData(res?.data);
        });
    }, []);
  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold'>Your Subscription</h1>
      <p className='mt-4'>Manage your subscription details here.</p>
      <div className='mt-8'>
         <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 w-full">
          {subscriptionData?.result?.map((plan:any, index:number) => (
            <div
              key={index}
              className="flex-1"
            //   onClick={() => setSelected(index)}
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
                    {plan?.features?.map((feature:any, featureIndex:number) => (
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
              `} >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
