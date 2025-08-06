/* eslint-disable @typescript-eslint/no-explicit-any */
import { facilitiesData } from "@/constants/Profile/FacilitesData";
import Image from "next/image";

const Facilities = ({ selectedFacilities, setSelectedFacilities }: { selectedFacilities: string[], setSelectedFacilities: (selectedFacilities: any) => void }) => {


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
        {facilitiesData.map((value, index) => {
          const isSelected = selectedFacilities.includes(value.label);

          return (
            <div
              key={index}
              onClick={() => toggleFacility(value.label)}
              className={`flex flex-col items-center justify-center gap-y-1  ${isSelected ? 'border border-primary/80 bg-gray-100' : ' border border-[#BABABA]'
                } w-auto min-w-[120px] rounded py-3 cursor-pointer transition-all`}
            >
              <div className="h-6 w-6">
                <Image src={value.img} height={24} width={24} alt={value.label} />
              </div>
              <p className="text-sm font-medium text-[#6B6B6B]">{value.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Facilities;