import SingleServiceCard from '@/components/shared/SingleServiceCard';
import { services } from '@/constants/Services/services';
import React from 'react';

const NearestRooms = () => {
    return (
        <div className=' container py-20 mt-10 '>
            <div className='flex justify-between items-center mb-6'> 
                <h3 className='font-medium text-[24px] text-[#333333] '> Nearest Rooms </h3>  
                <p className='text-primary text-[16px] font-normal cursor-pointer  underline'>View all</p>
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

export default NearestRooms;