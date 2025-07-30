import { customerExperienceData } from "@/constants/ServiceDetails/CustomerExperience/experience";
import { IoCalendarOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

const CustomerExperience = () => {
    return (
        <div> 
            <p className=" text-lg font-medium pb-4  ">Customer Experiences</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {customerExperienceData.map((review, index) => (
                    <div key={index} className="card border border-[#EEEEEE] rounded-lg p-4 mb-4 shadow">
                        <div className=" flex items-center gap-3 pb-3">
                            <img src={review?.image_url} alt="Profile" className="rounded-full h-12 w-12 object-fill" />
                            <div>
                                <div className="font-medium text-sm text-[#333333]">{review.name}</div>
                                <div className="text-[#767676] text-sm flex items-center gap-2">
                                    <p className="flex items-center gap-1">
                                        <span> <SlLocationPin size={14} />  </span>
                                        <span> {review.location} </span>
                                    </p>
                                    •
                                    <p className="flex items-center gap-1">
                                        <span> <IoCalendarOutline />  </span>
                                        <span> {review.date} </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-yellow-400">{'★'.repeat(review.rating)}</div>
                        <div className="mt-2 text-[#333333] text-xs ">{review.review}</div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default CustomerExperience;