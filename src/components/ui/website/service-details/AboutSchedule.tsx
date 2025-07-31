import Calender from "@/components/shared/Calendar";

const AboutSchedule = () => {
    return (
        <div className=" grid grid-cols-12 gap-14 pt-7 ">

            <div className=" col-span-8  text-[#767676] text-sm w-[85%]">
                <p className=" text-lg font-medium pb-4  text-[#333333] ">All About This Place</p>
                <p className=" leading-relaxed mb-4">
                    Perfect for couples, solo travelers, or business visitors seeking a quiet and comfortable stay. Kick back and relax in this calm, stylish space with modern amenities and thoughtful touches.
                </p>
                <ul className="list-none space-y-2 mb-4">
                    <li className="flex items-center">
                        <span className="w-4 h-4 mr-2 ">✓</span>
                        Access to Swimming Pool & Gym
                    </li>
                    <li className="flex items-center">
                        <span className="w-4 h-4 mr-2 ">✓</span>
                        High-speed Wi-Fi
                    </li>
                    <li className="flex items-center">
                        <span className="w-4 h-4 mr-2 ">✓</span>
                        Air conditioning
                    </li>
                    <li className="flex items-center">
                        <span className="w-4 h-4 mr-2 ">✓</span>
                        Fully equipped kitchen
                    </li>
                    <li className="flex items-center">
                        <span className="w-4 h-4 mr-2 ">✓</span>
                        24/7 security
                    </li>
                    <li className="flex items-center">
                        <span className="w-4 h-4 mr-2 ">✓</span>
                        Elevator & generator backup
                    </li>
                    <li className="flex items-center">
                        <span className="w-4 h-4 mr-2 ">✓</span>
                        Private parking (if applicable)
                    </li>
                </ul>
                <p className=" leading-relaxed">
                    You’re close to North South University, Jamuna Future Park, Evercare Hospital, and local cafes and restaurants — yet far enough from the city noise for a truly peaceful stay.
                </p>
            </div>

            <div className="col-span-4">
                <p className=" text-lg font-medium pb-4  text-[#333333] ">Room Closure Day</p> 
                 <Calender unavailableDay={["12-7-25"]} />
            </div>
        </div>
    );
};

export default AboutSchedule;