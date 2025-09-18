import Calender from "@/components/shared/Calendar";

const AboutSchedule = ({description, roomClosureDates}:{description:string , roomClosureDates:string[]}) => {
    return (
        <div className="grid grid-cols-12 gap-8 lg:gap-14 pt-6 px-4 sm:px-6 lg:px-0">
            {/* Text Section */}
            <div className="col-span-12 lg:col-span-8 text-[#767676] text-sm w-full">
                <p className="text-lg font-medium pb-4 text-[#333333]">All About This Place</p>
                <div className="leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: description || "" }}/>                
            </div>

            {/* Calendar Section */}
            <div className="col-span-12 lg:col-span-4">
                <p className="text-lg font-medium pb-4 text-[#333333]">Room Closure Day</p>
                <div className="w-full  border border-gray-200 rounded">
                    <Calender unavailableDay={roomClosureDates} />
                </div>
            </div>
        </div>
    );
};

export default AboutSchedule;
