"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const data = [
    {
        id:1 ,
        type:"Pilot",
        imgUrl:"/type1.svg"
    },
    {
        id:2 ,
        type:"Airline Staff",
        imgUrl:"/type2.svg"
    },
    {
        id:3 ,
        type:"Flight Attendant",
        imgUrl:"/type3.svg"
    },
]
const VerifiedAirline = () => { 
    const [activeType, setActiveType] = useState<number>(1); 
    const router = useRouter();
    return (
        <div className="lg:p-8 p-5">
            <div className=" flex flex-col items-center justify-center ">
                <h1 className="lg:text-[25px] text-[22px] text-center font-semibold text-primary pb-6 ">Verified Airline Person Get Special Deals</h1>
                <p className=" text-[16px] text-[#818181]  text-center w-2/3">Who Are You?</p>
            </div> 

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-[40px] pb-[60px]"> 

                {
                    data?.map((item) => (
                        <div key={item.id} className={` bg-white rounded-lg py-5 shadow-md px-2 ${activeType === item?.id && "border border-primary "} `} onClick={()=>setActiveType(item?.id)} >   
                        <div className="flex items-center justify-center"> 
                        <img src={item?.imgUrl} alt="" className=" w-16 h-16" /> 
                        </div>
                        <p className=" text-primary text-[16px] font-medium pt-4 text-center">{item?.type}</p>
                        </div>
                    ))
                }
            </div> 

<div className="flex flex-col items-center justify-center gap-7"> 
    <button className=" bg-primary text-white text-[16px] font-semibold rounded-full w-full h-12" onClick={()=>router.push("/verified-access")} > Verified Access </button> 

    <button className=" bg-white text-gray-500 border border-[#E0E0E0] text-[16px] font-medium rounded-full w-full h-12" onClick={()=>router.push("/login")}> Skip </button>
</div>

        </div>
    );
};

export default VerifiedAirline;