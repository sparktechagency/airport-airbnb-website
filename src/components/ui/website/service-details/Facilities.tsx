import { facilitiesData } from "@/constants/Profile/FacilitesData";
import Image from "next/image";


const FacilityList = () => {
  return (
      <div className=" pt-[60px] flex items-center flex-wrap gap-4 ">
        {facilitiesData.map((value, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center gap-y-1  border border-[#BABABA]
              w-auto min-w-[100px] rounded py-3 cursor-pointer transition-all`}
            >
              <div className="h-6 w-6">
                <Image src={value.img} height={24} width={24} alt={value.label} />
              </div>
              <p className="text-sm font-medium text-[#6B6B6B]">{value.label}</p>
            </div>
          );
        })}
      </div>
  );
};

export default FacilityList;