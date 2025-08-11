"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";

export interface SingleServiceCardProps {
    property: {
        name: string;
        rating: number;
        reviews: number;
        distance: string;
        price: string;
        image: string;
        key: number;
    }
}

const SingleServiceCard = ({ property }: SingleServiceCardProps) => {
    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleWishList = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault()
        setIsInWishlist(!isInWishlist);
    };

    return (
        <div className="w-[310px] bg-white rounded-xl shadow-md overflow-hidden">
            <Link href={`/service-details/${property.key}`}>
                <div className="relative">
                    <Image
                        alt="Property Image"
                        height={206}
                        width={310}
                        src={property?.image}
                        style={{ objectFit: "cover" }}
                        className="w-full transition-all duration-300 h-[206px]"
                    />


                    <div className="absolute top-2 right-2 cursor-pointer bg-white/70 rounded-full p-2 shadow">
                        <Heart
                            className=""
                            onClick={(e) => handleWishList(e)}
                            size={18}
                            color={isInWishlist ? "#083a65" : "#083a65"}
                            fill={isInWishlist ? "#083a65" : "transparent"}
                        />
                    </div>

                </div>
                <div className="p-4">
                    <h2 className="text-[16px] font-medium text-[#333333]">{property?.name}</h2>
                    <div className="flex items-center gap-2 text-[#FFD139] mt-1">
                        <AiFillStar size={16} />
                        <span className="text-[#767676] text-sm font-normal">{property?.rating} ({property?.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 mt-1 text-[#767676] text-sm font-normal">
                            <TfiLocationPin size={16} color="#767676" />
                            <span>{property?.distance}</span>
                        </div>
                        <div className="mt-2 text-primary font-medium text-[16px]">{property?.price} <span className="text-[#767676]  font-normal text-sm">/night</span></div>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default SingleServiceCard;