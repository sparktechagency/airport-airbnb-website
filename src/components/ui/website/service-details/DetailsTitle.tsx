"use client"
import { Heart } from "lucide-react";
import { useState } from "react";
import { GoShareAndroid } from "react-icons/go";

const DetailsTitle = () => {
    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleWishList = () => {
        setIsInWishlist(!isInWishlist);
    };
    return (
        <div className="flex items-center justify-between pb-5 ">
            <p className="text-2xl text-primary font-medium  "> Villa in Taiwan </p>

            <div className="flex items-center gap-5">
                <p className=" text-[#767676] text-xs flex items-center gap-1"> <span> <GoShareAndroid size={16} color="#767676" /> </span> <span> Share </span></p>
                <p className=" text-[#767676] text-xs flex items-center gap-1"> <span> <Heart
                    className=""
                    onClick={handleWishList}
                    size={18}
                    color={isInWishlist ? "#083a65" : "#083a65"}
                    fill={isInWishlist ? "#083a65" : "transparent"}
                />  </span> <span> Save for later </span></p>
            </div>

        </div>
    );
};

export default DetailsTitle;