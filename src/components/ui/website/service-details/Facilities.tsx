import { facilities } from "@/constants/ServiceDetails/others/Others";


const FacilityList = () => {
  return (
    <div className="pt-[60px] flex items-center gap-3"> 
      {facilities?.map((facility, index) => (
        <div key={index} className=" text-primary bg-gray-100 py-2 px-3 rounded text-sm flex items-center gap-1 ">
          <facility.icon /> 
          {facility.name}
        </div>
      ))}
    </div>
  );
};

export default FacilityList;