"use client"
import { HostData } from "@/constants/BeAHost/HostData";
import { useRouter } from "next/navigation";

const BeAHost = () => { 
    const router = useRouter()
    return (
        <div className="py-[67px] container w-full flex items-center justify-center  "> 
        <div className=" w-2/3 "> 

            <p className=" text-center text-[36px] font-semibold text-[#333333]"> Start hosting in 3 simple steps </p>
            <p className="text-[16px] font-normal text-[#767676] text-center "> Join our community of hosts and start earning from your space </p>

            <div className=" pt-20 pb-[60px]  flex flex-col  gap-y-5 ">
                {
                    HostData?.map((values, index) => (
                        <div key={index} className="w-full mx-auto bg-white rounded-xl shadow p-4 border border-gray-200">
                            <div className="flex items-start  p-2 ">
                                <div className=" w-16">
                                    <div className="flex items-center justify-center rounded-full w-12 h-12   text-primary bg-primary/10  ">
                                        {values?.icon}
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-primary text-xl font-medium">{values?.title}</h3>
                                    <p className="text-[#767676] text-[16px] font-normal mt-1 w-2/3">
                                        {values?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div> 

            <div className="  flex items-center justify-end"> 
                <button className=" bg-primary text-white text-[16px] font-normal px-10 h-[45px] rounded " onClick={()=>router.push("/steps-of-host")}> Next</button>
            </div>
        </div>
        </div>
    );
};

export default BeAHost;