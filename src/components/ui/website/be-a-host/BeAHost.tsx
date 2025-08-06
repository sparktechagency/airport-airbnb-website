"use client"
import { HostData } from "@/constants/BeAHost/HostData";
import { useRouter } from "next/navigation";

const BeAHost = () => { 
    const router = useRouter()
    return (
        <div className="py-[67px] container w-full flex items-center justify-center  "> 
        <div className=" lg:w-2/3 w-full "> 

            <p className=" text-center lg:text-[36px] text-2xl pb-2 font-semibold text-[#333333]"> Start hosting in 3 simple steps </p>
            <p className="lg:text-[16px] text-sm font-normal text-[#767676] text-center "> Join our community of hosts and start earning from your space </p>

            <div className=" lg:pt-20 pt-10 lg:pb-[60px] pb-10  flex flex-col  gap-y-5 ">
                {
                    HostData?.map((values, index) => (
                        <div key={index} className="w-full mx-auto bg-white rounded-xl shadow p-4 border border-gray-200">
                            <div className="flex items-start  p-2 ">
                                <div className=" lg:w-16 w-14">
                                    <div className="flex items-center justify-center rounded-full lg:w-12 lg:h-12 w-9 h-9    text-primary bg-primary/10  ">
                                        {values?.icon}
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-primary lg:text-xl text-lg  font-medium">{values?.title}</h3>
                                    <p className="text-[#767676] lg:text-[16px] text-sm font-normal mt-1 lg:w-2/3">
                                        {values?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div> 

            <div className="  flex items-center justify-end"> 
                <button className=" bg-primary text-white lg:text-[16px] text-sm font-normal px-10 h-[45px] rounded " onClick={()=>router.push("/steps-of-host")}> Next</button>
            </div>
        </div>
        </div>
    );
};

export default BeAHost;