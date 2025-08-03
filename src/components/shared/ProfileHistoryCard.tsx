import React from "react";
import Image from "next/image";

interface propertyType {
    image: string;
    name: string;
    roomType: string;
    location: string;
    checkIn: string;
    checkOut: string;
    price: string;
    propertyType: string;
}

interface propertyCardType {
    property: propertyType;
}

const ProfileHistoryCard = ({ property }: propertyCardType) => {
    return (
        <div className="w-full  bg-white rounded-md shadow-md overflow-hidden flex p-1 ">
            <div className="w-[250px] h-full relative pe-3">
                <Image
                    src={property.image}
                    alt={property.name}
                    width={450}
                    height={250}
                    className="object-cover rounded"
                />
            </div>
            <div className="flex-1 p-2.5 flex flex-col justify-between">
                <div>
                    <div className=" flex items-center justify-between">
                        <h2 className="text-[16px] font-semibold text-[#333] mb-1">
                            {property.name}
                        </h2>
                        <h2> <span className="text-xl font-semibold text-primary ">
                            {property.price}
                        </span> <span className=" text-[#767676] text-[16px] font-medium"> for 3 night </span></h2>
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
                            <button className="bg-primary text-white px-2.5 h-[36px] text-[12px] rounded cursor-pointer border-none">
                                Feedback
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProfileHistoryCard;
