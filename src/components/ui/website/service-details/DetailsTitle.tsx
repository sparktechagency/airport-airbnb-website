"use client"
import { myFetch } from "@/helpers/myFetch";
import { revalidateTags } from "@/helpers/revalidateTags";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { GoShareAndroid } from "react-icons/go";

const DetailsTitle = ({ id , isFavorite , serviceName}: { id: string , isFavorite:boolean , serviceName:string }) => {


    const handleWishList = async () => {
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
                revalidateTags(["hotel-details"])
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
        <div className="flex items-center justify-between pb-5 ">
            <p className="lg:text-2xl text-xl  text-primary font-medium  "> {serviceName} </p>

            <div className="flex items-center gap-5">
                <p className=" text-[#767676] text-xs flex items-center gap-1"> <span> <GoShareAndroid size={16} color="#767676" /> </span> <span className=" lg:block hidden"> Share </span></p>
                <p className=" text-[#767676] text-xs flex items-center gap-1"> <span> <Heart
                    className=""
                    onClick={handleWishList}
                    size={18}
                    color={isFavorite ? "#083a65" : "#083a65"}
                    fill={isFavorite ? "#083a65" : "transparent"}
                />  </span> <span className=" lg:block hidden"> Save for later </span></p>
            </div>

        </div>
    );
};

export default DetailsTitle;