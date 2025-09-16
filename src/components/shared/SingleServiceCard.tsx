"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import { AiFillStar } from "react-icons/ai";
import { HotelRoom } from "@/types/webPagesType";
import { imgUrl } from "@/config/config";
import toast from "react-hot-toast";
import { myFetch } from "@/helpers/myFetch";
import { revalidateTags } from "@/helpers/revalidateTags";

interface propertyType {
    property: HotelRoom
}

const SingleServiceCard = ({ property }: propertyType) => {


    const handleWishList = async ({ e, id }: { e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string }) => {
        e.preventDefault()
        console.log(id);
        const value = {
            hotel: id
        }

        try {
            const res = await myFetch("/favourite", {
                method: "POST",
                body: value,
            });
            if (res?.success) {
                toast.success(res?.message || "Mark as a favorite", { id: "favorite" });
                revalidateTags(["hotels"])
            } else {
                if (res?.error && Array.isArray(res.error)) {
                    res.error.forEach((err: { message: string }) => {
                        toast.error(err.message, { id: "favorite" });
                    });
                } else {
                    toast.error(res?.message || "Something went wrong!", { id: "favorite" });
                }
            }
        } catch (error) {
            console.error(error);
        }

    };



    return (
        <div className="w-[310px] bg-white rounded-xl shadow-md overflow-hidden">
            <Link href={`/service-details/${property._id}`}>
                <div className="relative">
                    <Image
                        alt="Property Image"
                        height={206}
                        width={310}
                        src={`${imgUrl}${property?.image?.[0]}`}
                        style={{ objectFit: "cover" }}
                        className="w-full transition-all duration-300 h-[206px]"
                    />


                    <div className="absolute top-2 right-2 cursor-pointer bg-white/70 rounded-full p-2 shadow">
                        <Heart
                            className=""
                            onClick={(e) => handleWishList({ e, id: property?._id })}
                            size={18}
                            color={ property?.isFavorite ? "#083a65" : "#083a65"}
                            fill={ property?.isFavorite ? "#083a65" : "transparent"}
                        />
                    </div>

                </div>
                <div className="p-4">
                    <h2 className="text-[16px] font-medium text-[#333333]">{property?.name}</h2>
                    <div className="flex items-center gap-2 text-[#FFD139] mt-1">
                        <AiFillStar size={16} />
                        <span className="text-[#767676] text-sm font-normal">{property?.avgRating} ({property?.totalReviews})</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 mt-1 text-[#767676] text-sm font-normal">
                            <TfiLocationPin size={16} color="#767676" />
                            <span>{property?.address}</span>
                        </div>
                        <div className="mt-2 text-primary font-medium text-[16px]">{property?.roomPrice} <span className="text-[#767676]  font-normal text-sm">/{property?.roomType}</span></div>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default SingleServiceCard;