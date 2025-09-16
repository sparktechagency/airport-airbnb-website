import SingleServiceCard from '@/components/shared/SingleServiceCard';
import { HotelRoom } from '@/types/webPagesType';
import Link from 'next/link';
import React from 'react'; 

interface NearestRoomsProps {
  rooms: HotelRoom[]; 
}
 
const NearestRooms = ({rooms}:NearestRoomsProps) => {
    return (
        <div className=' container lg:py-20 py-14 mt-10 '>
            <div className='flex justify-between items-center mb-6'> 
                <h3 className='font-medium lg:text-[24px] text-xl text-[#333333] '> Nearest Rooms </h3>  
                <Link href={"/services"} className='text-primary lg:text-[16px] text-sm font-normal cursor-pointer  underline'>View all</Link>
            </div> 

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center'>
                {
                    rooms.map((property, index) => (
                        <SingleServiceCard key={index} property={property} />
                    ))
                }
            </div>
        </div>
    );
};

export default NearestRooms;