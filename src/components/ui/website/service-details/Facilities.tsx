import { imgUrl } from "@/config/config";
import Image from "next/image";

interface facilityType {
  _id: string,
  name: string,
  logo: string,
}

interface facilitiesType {
  facilities: facilityType[]
}

const FacilityList = ({ facilities }: facilitiesType) => {
  return (
    <div className=" pt-[60px] flex items-center flex-wrap gap-x-4 ">
      {facilities?.map((value) => {
        return (
          <div
            key={value?._id}
            className={`flex flex-col items-center justify-center gap-y-1  border border-[#BABABA]
              w-auto min-w-[100px] rounded py-3 cursor-pointer transition-all px-3`}
          >
            <div className="h-7 w-7">
              <Image src={value.logo?.startsWith("https") ? value?.logo : `${imgUrl}${value?.logo}`} height={28} width={28} alt={value?.name} />
            </div>
            <p className="text-sm font-medium text-[#6B6B6B]">{value?.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FacilityList;