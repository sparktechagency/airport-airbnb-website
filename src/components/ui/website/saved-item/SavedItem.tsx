import SingleServiceCard from "@/components/shared/SingleServiceCard";
import { services } from "@/constants/Services/services";

const SavedItem = () => {
    return (
        <div className=' container pb-14 pt-7  '>
            <div className='flex justify-between items-center mb-6'> 
                <h3 className='font-medium text-[24px] text-[#333333] '> Saved Item </h3>          
            </div> 

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    services.map((property, index) => (
                        <SingleServiceCard key={index} property={property} />
                    ))
                }
            </div>
        </div>
    );
};

export default SavedItem;