import { imgUrl } from "@/config/config";
import { CustomerExperienceProps } from "@/types/webPagesType";
import { IoCalendarOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

const CustomerExperience = ({ reviewsData }: CustomerExperienceProps) => {
    return (
        <div>
            <p className="text-lg font-medium pb-4">Customer Experiences</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reviewsData?.map((review) => (
                    <div
                        key={review?._id}
                        className="card border border-[#EEEEEE] rounded-lg p-4 mb-4 shadow"
                    >
                        {/* Profile + User Info */}
                        <div className="flex items-center gap-3 pb-3">
                            <img
                                src={review?.user?.profilePic?.startsWith("https") ? review?.user?.profilePic : `${imgUrl}${review?.user?.profilePic}`}
                                alt="Profile"
                                className="rounded-full h-12 w-12 object-cover"
                            />
                            <div>
                                <div className="font-medium text-sm text-[#333333]">
                                    {review?.user?.name}
                                </div>
                                <div className="text-[#767676] text-sm flex items-center gap-2">
                                    <p className="flex items-center gap-1">
                                        <SlLocationPin size={14} />
                                        <span> Dhaka, Bangladesh </span>
                                    </p>
                                    •
                                    <p className="flex items-center gap-1">
                                        <IoCalendarOutline size={14} />
                                        <span>
                                            {new Date(review?.createdAt).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="text-yellow-400">
                            {"★".repeat(review?.rating)}
                        </div>

                        {/* Review Content */}
                        <div className="mt-2 text-[#333333] text-xs">
                            {review?.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerExperience;
