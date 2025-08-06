import React, { useState } from "react";
import Image from "next/image";
import FeedbackModal from "../modals/FeedbackModal";
import { useRouter, useSearchParams } from "next/navigation";

type propertyType = {
    name: string;
    roomType: string;
    location: string;
    checkIn: string;
    checkOut: string;
    price: string;
    image: string;
    key: number;
}

interface propertyCardType {
    property: propertyType;
}

const ProfileHistoryCard = ({ property }: propertyCardType) => {
    const searchParams = useSearchParams()
    const tab = searchParams.get("tab")
    const [open, setOpen] = useState(false)
    const router = useRouter()


    return (
        <div className="w-full  bg-[#fafbfc] rounded-md shadow-md overflow-hidden flex lg:flex-row flex-col justify-items-center p-1 ">
            <div className="lg:w-[250px] w-full h-full relative lg:pe-3">
                <Image
                    src={property.image}
                    alt={property.name}
                    width={450}
                    height={250}
                    className="object-cover rounded w-full"
                />
            </div>
            <div className="flex-1 p-2.5 flex flex-col justify-between">
                <div>
                    <div className=" flex items-center justify-between">
                        <h2 className="text-[16px] font-semibold text-[#333] mb-1">
                            {property.name}
                        </h2>
                        <h2> <span className="lg:text-xl text-lg font-semibold text-primary ">
                            {property.price}
                        </span> <span className=" text-[#767676] lg:text-[16px] text-sm font-medium"> for 3 night </span></h2>
                    </div>
                    <p className="text-[12px] text-[#767676] mb-1"> {property.roomType}</p>
                    <p className="text-[12px] text-[#767676] mb-1"> {property.location}</p>

                    <div className=" flex items-center justify-between">
                        <div>
                            <p className="text-[12px] text-primary mt-5">
                                Check in: {property.checkIn}
                            </p>
                            <p className="text-[12px] text-primary mt-1">
                                Check out: {property.checkOut}
                            </p>
                        </div>


                        <div className="flex justify-between items-end">
                            {
                                tab === "3" ?
                                    <button className="bg-primary text-white px-2.5 h-[36px] text-[12px] rounded cursor-pointer border-none"
                                        onClick={() => setOpen(true)}>
                                        Feedback
                                    </button>
                                    :
                                    <button className='bg-primary text-white px-3 py-2 text-xs rounded font-medium' onClick={() => router.push("/property-info")}>  Edit Property</button>
                            }

                        </div>
                    </div>

                </div>

            </div>
            <FeedbackModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default ProfileHistoryCard;
