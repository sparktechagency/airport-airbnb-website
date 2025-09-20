/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgUrl } from "@/config/config";
import { myFetch } from "@/helpers/myFetch";
import { IFacility } from "@/types/hotel/hotel";
import Image from "next/image";
import { useEffect, useState } from "react";

const Facilities = ({ selectedFacilities, setSelectedFacilities }: { selectedFacilities: string[], setSelectedFacilities: (selectedFacilities: any) => void }) => {

  const [facilitys, setFacilitys] = useState<IFacility[]>([]); 

  useEffect(() => {
    myFetch("/facilitiy").then((res) => {
      setFacilitys(res.data?.data);
    });
  }, []) 

  
  const toggleFacility = (label: string) => {
    setSelectedFacilities((prev: string[]) =>
      prev.includes(label)
        ? prev.filter((item: string) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div>
      <div className=" flex items-center flex-wrap gap-4 ">
        {facilitys?.map((value, index) => {
          const isSelected = selectedFacilities.includes(value?._id);

          return (
            <div
              key={index}
              onClick={() => toggleFacility(value?._id)}
              className={`flex flex-col p-3 items-center justify-center gap-y-1  ${isSelected ? 'border border-primary/80 bg-gray-100' : ' border border-[#BABABA]'
                } w-auto min-w-[100px] rounded py-3 cursor-pointer transition-all`}
            >
              <div className="h-6 w-6">
                <Image src={imgUrl + value?.logo} height={24} width={24} alt={value?.name} />
              </div>
              <p className="text-sm font-medium text-[#6B6B6B]">{value?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Facilities;